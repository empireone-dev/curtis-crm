<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\AgentNote;
use App\Models\DecisionMaking;
use App\Models\DirectEmail;
use App\Models\EmailTemplate;
use App\Models\ExportFile;
use App\Models\Receipt;
use App\Models\Replacement;
use App\Models\Ticket;
use App\Models\User;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Http;

class TicketController extends Controller
{
    public function send_warranty_email($recipient, $subject, $body)
    {
        $scriptUrl = 'https://script.google.com/macros/s/AKfycbygsAn0dDZyLFcs1wwAC4dIyQD8K8dgMrPyL5sdgwYV7G9YaG8SaJSSwVgD5g_SPdUC/exec';

        $params = [
            'recipient' => $recipient,
            'subject' => $subject,
            'body' => $body
        ];
        $client = new Client();
        $response = $client->post($scriptUrl, [
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded'
            ],
            'form_params' => $params
        ]);
        $body = $response->getBody()->getContents();
        return $body;
    }
    public function send_parts_email($recipient, $subject, $body)
    {
        $scriptUrl = 'https://script.google.com/macros/s/AKfycbx9LsPiFQTvydnoCEmDPAMUTyQSEmdOHYxrSS507QZbiIAYrNWOLTogRWAUcX8BTx3x/exec';
        $params = [
            'recipient' => $recipient,
            'subject' => $subject,
            'body' => $body
        ];
        $client = new Client();
        $response = $client->post($scriptUrl, [
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded'
            ],
            'form_params' => $params
        ]);
        $body = $response->getBody()->getContents();
        return $body;
    }
    public function move_ticket_assignment(Request $request)
    {
        $ticket = Ticket::where('id', $request->ticket_id)->first();
        if ($ticket->call_type == 'TS-Tech Support' && $request->call_type == 'CF-Warranty Claim') {
            $this->send_warranty_email($request->recipient, $request->subject, $request->body);
        } else if ($ticket->call_type == 'TS-Tech Support' && $request->call_type == 'Parts') {
            $this->send_parts_email($request->recipient, $request->subject, $request->body);
        }
        $ticket->update([
            'user_id' => $this->queueing($request->call_type),
            'call_type' => $request->call_type,
            'move_status' => $ticket->move_status ? $ticket->call_type . ' move to ' . $request->call_type : $ticket->move_status . ' move to ' . $request->call_type,
            'status' => $request->call_type == 'CF-Warranty Claim' ? 'WARRANTY VALIDATION' : ($request->call_type == 'Parts' ? 'PARTS VALIDATION' : 'TECH VALIDATION')
        ]);
        
        return response()->json([
            'result' => 'success'
        ], 200);
    }
    public function create_verify_tickets(Request $request)
    {
        ExportFile::create([
            'export_name' => $request->search
        ]);
        return response()->json([
            'result' => 'success'
        ], 200);
    }
    public function verify_tickets(Request $request)
    {
        $export = ExportFile::where('export_name', $request->search)->first();
        if ($export) {
            return response()->json([
                'result' => 'exist'
            ], 200);
        } else {
            return response()->json([
                'result' => 'unexist'
            ], 200);
        }
    }
    public function transfer_ticket_cases(Request $request)
    {
        $ticket = Ticket::where('id', $request->ticket_id);
        $ticket->update([
            'user_id' => $request->user_id
        ]);
    }
    public function forward_ticket(Request $request)
    {

        $subject = '';
        $length = strlen($request->id);
        $id = '';
        if ($length == 1) {
            $id = date("dmy") . '00000' . $request->id;
        } else if ($length == 2) {
            $id = date("dmy") . '0000' . $request->id;
        } else if ($length == 3) {
            $id = date("dmy") . '000' . $request->id;
        }

        if ($request->call_type == 'Parts') {
            $subject = 'PS' . $id;
        } else if ($request->call_type == 'CF-Warranty Claim') {
            $subject = 'CF' . $id;
        } else {
            $subject = 'TS' . $id;
        }

        $ticket = Ticket::where('id', $request->id)->with('user')->first();

        $ticket->update([
            'call_type' => $request->where_to_move == 'WARRANTY VALIDATION' ? 'CF-Warranty Claim' : 'Parts',
            'status' => $request->where_to_move
        ]);
        Activity::create([
            'user_id' => $request->user_id,
            'ticket_id' => $request->id,
            'type' => 'CHANGE CALL TYPE',
            'message' => json_encode($request->all())
        ]);

        $newData = array_merge($ticket->user->toArray(), [
            'id' => $request->id,
            'ticket_id' => $subject,
            'call_type' => $request->where_to_move == 'WARRANTY VALIDATION' ? 'CF-Warranty Claim' : 'Parts',
            'email' => $ticket->email,
            'isSendEmail' => 'true',
        ]);

        $emailController = App::make(EmailTemplateController::class);
        $emailController->send_mail_create_ticket_form($newData);

        return response()->json([
            'result' => $ticket
        ], 200);
    }
    public function search_tickets(Request $request)
    {
        // Initialize the query builder
        $query = Ticket::query();

        // Add the date range filter if start and end are provided
        if ($request->has('start') && $request->has('end')) {
            $startTime = Carbon::createFromFormat('Y-m-d', $request->start)->startOfDay();
            $endTime = Carbon::createFromFormat('Y-m-d', $request->end)->endOfDay();
            $query->whereBetween('created_at', [$startTime, $endTime]);
        }

        // Add item_number condition if provided
        if ($request->model) {
            $query->where('item_number', '=', $request->model);
        }
        if ($request->call_type) {
            $query->where('call_type', '=', $request->call_type);
        }


        $tickets = $query->paginate(10);
        // Return the result as JSON
        return response()->json([
            'data' => $tickets
        ], 200);
    }
    public function get_tickets_by_email($email)
    {
        $tickets = Ticket::where('email', '=', $email)->get();
        return response()->json([
            'result' => $tickets
        ], 200);
    }

    public function transfer_ticket(Request $request, $id)
    {
        foreach ($request->selected as $key => $value) {
            $ticket = Ticket::where('id', '=', $value['id'])->first();
            $ticket->update([
                'user_id' => $request->agent
            ]);
        }
        return response()->json([
            'result' => 'success'
        ], 200);
    }
    public function close_ticket(Request $request, $id)
    {
        $ticket = Ticket::where('id', '=', $id)->first();
        $ticket->update([
            'reason_to_close' => $request->reason,
            'status' => 'CLOSED'
        ]);

        Activity::create([
            'user_id' => $request->user['id'],
            'ticket_id' => $id,
            'type' => $request->type,
            'message' => json_encode($request->all())
        ]);
    }
    public function get_tickets_by_asc(Request $request, $status)
    {
        if ($status !== 'undefined') {
            $result = Ticket::where([['asc_id', '=', $request->id], ['status', '=',  'REPAIR']])->get();
            return response()->json([
                'result' =>  $result
            ], 200);
        } else {
            $result = Ticket::where([['asc_id', '=', $request->id], ['decision_status', '=', 'REPAIR']])
                ->orWhere([['asc_id', '=', $request->id], ['decision_status', '=', 'REPAIRED']])
                ->orWhere([['asc_id', '=', $request->id], ['decision_status', '=', 'NOT REPAIRED']])->get();
            return response()->json([
                'result' => $result
            ], 200);
        }
    }
    public function update(Request $request, $id)
    {

        $ticket = Ticket::where('id', $id)->first();
        if ($ticket) {
            $ticket->update($request->all());
        }
        $receipt = Receipt::where('ticket_id', $id)->first();
        if ($receipt) {
            $receipt->update([
                'store' => $request->store
            ]);
        } else {
            Receipt::create([
                'store' => $request->store,
                'user_id' => $ticket->user_id,
                'ticket_id' => $id,
                'retailers_price' => 0,
                'discount' => 0,
                'total_price' => 0,
                'refurbished' => 'true',
                'notes' => '',
            ]);
        }
        return response()->json([
            'result' => $ticket
        ], 200);
    }
    public function get_tickets_by_warehouse($country)
    {
        // $ticket = Ticket::where([
        //     ['country','=',$country],
        //     ['status','=','WAREHOUSE']
        // ])->get();
        $ticket = Ticket::where([
            ['country', '=', $country],
            ['status', '=', $country == 'CA' ? 'CA WAREHOUSE' : 'US WAREHOUSE']
        ])->get();

        return response()->json([
            'result' => $ticket
        ], 200);
    }
    public function get_tickets_by_ticket_id($ticket_id)
    {
        $ticket = Ticket::where('id', $ticket_id)->with(['decision_making', 'replacement', 'receipt', 'refund', 'repair'])->first();
        $asc = DecisionMaking::where('id', $ticket->decision_making_id)->with(['user'])->first();
        return response()->json([
            'result' => array_merge($ticket->toArray(), ['asc' => $asc ? $asc->toArray() : null]),
        ], 200);
    }

    public function update_tickets_status(Request $request, $id)
    {
        $ticket = Ticket::where('id', $id)->first();
        $ticket->update([
            'status' => $request->status
        ]);
        $user = User::find($request->user_id);

        $ticketArray = $ticket instanceof Ticket ? $ticket->toArray() : [];

        if ($request->from == 'warehouse') {
            Activity::create([
                'user_id' => $request->user_id,
                'ticket_id' => $id,
                'type' => 'WAREHOUSE RECEIVED',
                'message' => json_encode(array_merge($ticketArray, ['replacement' => $request->data]))
            ]);
        }
        Activity::create([
            'user_id' => $request->user_id,
            'ticket_id' => $id,
            'type' => 'ASSIGNED TO',
            'message' => json_encode(array_merge($ticketArray, ['data' => $request->all()]))
        ]);
        return response()->json([
            'result' => $ticket
        ], 200);
    }
    public function update_explanation(Request $request, $id)
    {
        $ticket = Ticket::where('id', $id)->first();
        $ticket->update([
            'explanation' => $request->explanation
        ]);
        return response()->json([
            'result' => $ticket
        ], 200);
    }


    public function index(Request $request)
    {
        $searchQuery = $request->input('search');

        // Get all column names of the table
        $columns = Schema::getColumnListing('tickets');

        // Start the query builder
        $query = Ticket::query();
        if ($searchQuery) {
            // Dynamically add where conditions for each column
            $query->where(function ($query) use ($columns, $searchQuery) {
                foreach ($columns as $column) {
                    if ($searchQuery == 'WARRANTY VALIDATION') {
                        $query->orWhere([[$column, '=',  $searchQuery], ['isUploading', '=', 'true']]);
                    } else if ($searchQuery == 'OPEN WARRANTY') {
                        $query->orWhere([['call_type', '=', 'CF-Warranty Claim'], ['isUploading', '=', 'false'], ['status', '=', 'WARRANTY VALIDATION']]);
                    } else if ($searchQuery == 'OPEN PARTS') {
                        $query->orWhere([['call_type', '=', 'Parts'], ['isUploading', '=', 'false'], ['status', '=', 'PARTS VALIDATION']]);
                    } else if ($searchQuery == 'OPEN TECH') {
                        $query->orWhere([['call_type', '=', 'TS-Tech Support'], ['isUploading', '=', 'false'], ['status', '=', 'TECH VALIDATION']]);
                    } else {
                        $query->orWhere([[$column, '=',  $searchQuery]]);
                    }
                }
                $query->orWhere('ticket_id', '=', $searchQuery);
            });
        }

        if ($request->start && $request->end) {
            $startTime = Carbon::createFromFormat('Y-m-d', $request->start)->startOfDay();
            $endTime = Carbon::createFromFormat('Y-m-d', $request->end)->endOfDay();
            $query->whereBetween('created_at', [$startTime, $endTime]);
        }

        // Add item_number condition if provided
        if ($request->model && ($request->model != 'null' && $request->model != 'undefined')) {
            $models = explode(',', $request->model);
            $query->whereIn('item_number', $models);
        }
        if ($request->call_type  && ($request->call_type != 'null' && $request->call_type != 'undefined')) {
            $query->where('call_type', '=', $request->call_type);
        }
        if ($request->status  && ($request->status != 'null' && $request->status != 'undefined')) {
            $query->where('status', '=', $request->status);
        }

        if ($request->status == 'WEB FORM') {
            $query->orWhere('created_from', '=', $request->status);
        }
        if ($request->status == 'AGENT FORM') {
            $query->orWhere('created_from', '=', $request->status);
        }

        $query->orderBy('created_at', 'desc');
        $data = $query->paginate(10);

        return response()->json([
            'data' => $data ?? [],
        ], 200);
    }

    public function save_direct_emails_parts()
    {
        $scriptUrlParts = 'https://script.google.com/macros/s/AKfycbxB47GclMU6dAK5A7to2-JIOAq1BWKKbPwVmv5-1_jCsSkkA56PjsAY2OZKqrIJ_niW/exec?page=' . '1';
        // This for parts
        $responseParts = Http::get($scriptUrlParts);
        $responseDataParts = $responseParts->json();

        foreach ($responseDataParts as $key => $value) {
            $direct =  DirectEmail::where('threadId', '=', $value['threadId'])->first();
            if (!$direct) {
                $users = User::where('role_id', 5)
                    ->where('agent_type', '=', "Parts")
                    ->get();
                $userWithSmallestCount = null;
                $smallestCount = PHP_INT_MAX; // Initialize with the maximum integer value

                foreach ($users as $user) {
                    $count = DirectEmail::where('user_id', $user->id)->count();

                    if ($count < $smallestCount) {
                        $smallestCount = $count;
                        $userWithSmallestCount = $user;
                    }
                }

                DirectEmail::create([
                    'email' => $value['emails'][0]['from'],
                    'threadId' => $value['threadId'],
                    'user_id' => $userWithSmallestCount->id,
                    'count' => $value['count'],
                    'email_date' => $value['emails'][0]['date'],
                ]);
            } else {
                if ($value['count'] != $direct->count) {
                    $direct->update([
                        'isHide' => 'false'
                    ]);
                }
            }
        }
        return response()->json([
            'result' => $responseDataParts
        ], 200);
    }
    public function save_direct_emails()
    {
        $scriptUrl = 'https://script.google.com/macros/s/AKfycbwpQMUrI6JbMffJkzfIHYD6wZdnpONtQS_ou43KD3BcbkUnVLZLIbs9QusfbHmGeaus/exec?page=' . '1';
        // this for warranty
        $response = Http::get($scriptUrl);
        $responseData = $response->json();
        foreach ($responseData as $key => $value) {
            $direct =  DirectEmail::where('threadId', '=', $value['threadId'])->first();
            if (!$direct) {
                $users = User::where('role_id', 5)
                    ->where('agent_type', '=', "Warranty")
                    ->get();
                $userWithSmallestCount = null;
                $smallestCount = PHP_INT_MAX; // Initialize with the maximum integer value

                foreach ($users as $user) {
                    $count = DirectEmail::where('user_id', $user->id)->count();

                    if ($count < $smallestCount) {
                        $smallestCount = $count;
                        $userWithSmallestCount = $user;
                    }
                }

                DirectEmail::create([
                    'email' => $value['emails'][0]['from'],
                    'threadId' => $value['threadId'],
                    'user_id' => $userWithSmallestCount->id,
                    'count' => $value['count'],
                    'email_date' => $value['emails'][0]['date'],
                ]);
            } else {
                if ($value['count'] != $direct->count) {
                    $direct->update([
                        'isHide' => 'false'
                    ]);
                }
            }
        }
        return response()->json([
            'result' => $responseData
        ], 200);
    }

    public function direct_emails(Request $request)
    {
        $direct = DirectEmail::where([['user_id', '=', $request->user_id], ['isHide', '=', 'false']])->paginate(10);
        return response()->json([
            'result' => $direct,
        ], 200);
    }
    public function cases(Request $request)
    {
        // Number of results per page
        $perPage = 10;
        $data = [];
        $user = User::where('id', $request->user_id)->first();
        if ($user->agent_type == 'Warranty') {
            $call_type = 'CF-Warranty Claim';
        } elseif ($user->agent_type == 'Parts') {
            $call_type = 'Parts';
        } else {
            $call_type = 'Tech';
        }

        if ($request->cases == 'open_cases') {
            $dataQuery = Ticket::where([['user_id', '=', $request->user_id], ['call_type', '=', $call_type]]);
            $data = $dataQuery->paginate($perPage);
            $emails = [];
            foreach ($data as $ticket) {
                $searchSubject = substr($ticket->ticket_id, 1);
                if ($ticket->call_type == 'CF-Warranty Claim') {
                    $scriptUrl = 'https://script.google.com/macros/s/AKfycbyUoR8Q2_YTZAfJbT_nAev_swdU74hmQpIWMF6dKm_GePzCf1aEKjnsaK1--mrrtw/exec?ticket_id=' . $searchSubject;
                    $response = Http::get($scriptUrl);
                    $responseData = $response->json();
                    if ($response->successful() && count($responseData) != 0) {
                        if ($responseData[0]['from'] != 'support2@curtiscs.com' && $responseData[0]['from'] != 'Support2 Curtis <support2@curtiscs.com>') {
                            $emails[] = [
                                'ticket' => $ticket,
                                'emails' => $responseData,
                            ];
                        }
                    }
                } else if ($ticket->call_type == 'Parts') {
                    $scriptUrl = 'https://script.google.com/macros/s/AKfycbyF4mHjcDMhQX_Sllsw6ribQpj0KfEmryBMnxJBBi2Q3ivSewPK1wDfve4yaE9p5aUT/exec?ticket_id=' . $searchSubject;
                    $response = Http::get($scriptUrl);
                    $responseData = $response->json();
                    if ($response->successful() && count($responseData) != 0) {
                        if ($responseData[0]['from'] != 'parts@curtiscs.com' && $responseData[0]['from'] != 'Parts Team <parts@curtiscs.com>') {
                            $emails[] = [
                                'ticket' => $ticket,
                                'emails' => $responseData,
                            ];
                        }
                    }
                }
            }
            // Set the emails collection to the data
            $data->setCollection(collect($emails));
        } else if ($request->cases == 'handled') {
            $dataQuery = Ticket::where([['user_id', '=', $request->user_id], ['call_type', '=', $call_type]]);
            $data = $dataQuery->paginate($perPage);
            $emails = [];
            foreach ($data as $ticket) {
                $searchSubject = substr($ticket->ticket_id, 1);
                if ($ticket->call_type == 'CF-Warranty Claim') {
                    $scriptUrl = 'https://script.google.com/macros/s/AKfycbyUoR8Q2_YTZAfJbT_nAev_swdU74hmQpIWMF6dKm_GePzCf1aEKjnsaK1--mrrtw/exec?ticket_id=' . $searchSubject;
                    $response = Http::get($scriptUrl);
                    $responseData = $response->json();
                    if ($response->successful() && count($responseData) != 0) {
                        if ($responseData[0]['from'] != 'support2@curtiscs.com' || $responseData[0]['from'] == 'Support2 Curtis <support2@curtiscs.com>') {
                            $emails[] = [
                                'ticket' => $ticket,
                                'emails' => $responseData,
                            ];
                        }
                    }
                } else if ($ticket->call_type == 'Parts') {
                    $scriptUrl = 'https://script.google.com/macros/s/AKfycbyF4mHjcDMhQX_Sllsw6ribQpj0KfEmryBMnxJBBi2Q3ivSewPK1wDfve4yaE9p5aUT/exec?ticket_id=' . $searchSubject;
                    $response = Http::get($scriptUrl);
                    $responseData = $response->json();
                    if ($response->successful() && count($responseData) != 0) {
                        if ($responseData[0]['from'] == 'parts@curtiscs.com' || $responseData[0]['from'] == 'Parts Team <parts@curtiscs.com>') {
                            $emails[] = [
                                'ticket' => $ticket,
                                'emails' => $responseData,
                            ];
                        }
                    }
                }
            }
            // Replace the paginated data items with the merged emails
            $data->setCollection(collect($emails));
        } else if ($request->cases == 'closed_cases') {
            $dataQuery = Ticket::where([['user_id', '=', $request->user_id], ['call_type', '=', $call_type], ['status', '=', 'CLOSED']]);
            $data = $dataQuery->paginate($perPage);
            $emails = [];
            foreach ($data as $ticket) {
                $searchSubject = substr($ticket->ticket_id, 1);
                if ($ticket->call_type == 'CF-Warranty Claim') {
                    $scriptUrl = 'https://script.google.com/macros/s/AKfycbyUoR8Q2_YTZAfJbT_nAev_swdU74hmQpIWMF6dKm_GePzCf1aEKjnsaK1--mrrtw/exec?ticket_id=' . $searchSubject;
                    $response = Http::get($scriptUrl);
                    $responseData = $response->json();
                    if ($response->successful() && count($responseData) != 0) {
                        $emails[] = [
                            'ticket' => $ticket,
                            'emails' => $responseData,
                        ];
                    }
                } else if ($ticket->call_type == 'Parts') {
                    $scriptUrl = 'https://script.google.com/macros/s/AKfycbyF4mHjcDMhQX_Sllsw6ribQpj0KfEmryBMnxJBBi2Q3ivSewPK1wDfve4yaE9p5aUT/exec?ticket_id=' . $searchSubject;
                    $response = Http::get($scriptUrl);
                    $responseData = $response->json();
                    if ($response->successful() && count($responseData) != 0) {
                        $emails[] = [
                            'ticket' => $ticket,
                            'emails' => $responseData,
                        ];
                    }
                }
            }
            $data->setCollection(collect($emails));
        }

        return response()->json([
            'result' => $data
        ], 200);
    }
    public function show(Request $request, $id)
    {
        $perPage = 10;
        if ($request->search) {
            // Use pagination with search query
            $data = Ticket::where([['status', '=', $request->search], ['user_id', '=', $id]])
                ->paginate($perPage);
        } else {
            $data = Ticket::where('user_id', '=', $id)
                ->paginate($perPage);
        }
        return response()->json([
            'result' => $data,
        ], 200);
    }


    public function get_users()
    {
        $call_type = 'TS-Tech Support';
        $type = '';
        switch ($call_type) {
            case 'Parts':
                $type = 'Parts';
                break;
            case 'CF-Warranty Claim':
                $type = 'Warranty';
                break;
            case 'TS-Tech Support':
                $type = 'Tech';
                break;
            default:
                // Handle default case if needed
        }

        $users = User::where('role_id', 5)
            ->where('agent_type', 'like', "%$type%")
            ->get();
        return response()->json([
            'result' => $users,
        ], 200);
    }

    public function queueing($call_type)
    {
        $type = '';
        switch ($call_type) {
            case 'Parts':
                $type = 'Parts';
                break;
            case 'CF-Warranty Claim':
                $type = 'Warranty';
                break;
            case 'TS-Tech Support':
                $type = 'Tech';
                break;
            default:
                // Handle default case if needed
        }

        $users = User::where('role_id', 5)
            ->where('agent_type', 'like', "%$type%")
            ->get();
        $userWithSmallestCount = null;
        $smallestCount = PHP_INT_MAX; // Initialize with the maximum integer value

        foreach ($users as $user) {
            $count = Ticket::where('user_id', $user->id)->count();

            if ($count < $smallestCount) {
                $smallestCount = $count;
                $userWithSmallestCount = $user;
            }
        }
        return $userWithSmallestCount->id;
        // $usersWithSmallestCount contains all users with the smallest count of tickets
    }


    public function store(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        $account = [];
        $newData = [];


        $validation = '';
        if ($request->call_type == 'Parts') {
            $validation = 'PARTS VALIDATION';
        } else if ($request->call_type == 'CF-Warranty Claim') {
            $validation = 'WARRANTY VALIDATION';
        } else {
            $validation = 'TECH VALIDATION';
        }

        if ((!$user) && $request->isHasEmail == true || (!$user) && $request->isHasEmail == 'true') {
            $account = User::create([
                'name' => $request->fname . ' ' . $request->lname,
                'email' => $request->email,
                'password' => Hash::make('12345678'),
                'role_id' => '2',
                'address' => $request->address,
                'city' => $request->city,
                'zip_code' => $request->zip_code,
                'country' => $request->country,
            ]);

            $data = Ticket::create(array_merge($request->all(), [
                'user_id' => $this->queueing($request->call_type),
                'status' => $validation,
                'cases_status' => 'handled'
            ]));

            Activity::create([
                'user_id' => $request->user['id'],
                'ticket_id' => $data->id,
                'type' => 'TICKET CREATED',
                'message' => json_encode($data)
            ]);

            $subject = '';
            $length = strlen($data->id);
            $id = '';
            if ($length == 1) {
                $id = date("dmy") . '00000' . $data->id;
            } else if ($length == 2) {
                $id = date("dmy") . '0000' . $data->id;
            } else if ($length == 3) {
                $id = date("dmy") . '000' . $data->id;
            }

            if ($request->call_type == 'Parts') {
                $subject = 'PS' . $id;
            } else if ($request->call_type == 'CF-Warranty Claim') {
                $subject = 'CF' . $id;
            } else {
                $subject = 'TS' . $id;
            }

            $t = Ticket::where('id', $data->id)->first();
            $tt = Ticket::where('id', $data->id)->first();
            $t->update([
                'ticket_id' => $subject
            ]);

            AgentNote::create([
                'user_id' => $account->id,
                'ticket_id' => $data->id,
                'message' => $request->remarks,
            ]);
            if ($request->isSendEmail == 'true' || $request->isSendEmail == true || $request->email && $request->isSendEmail) {
                // $newData = array_merge($account->toArray(), [
                //     'id' => $data->id,
                //     'ticket_id' => $tt->ticket_id,
                //     'call_type' => $request->call_type,
                //     'isSendEmail' => $request->isSendEmail,
                //     'isHasEmail' => $request->isHasEmail,
                // ]);

                // $emailController = App::make(EmailTemplateController::class);
                // $emailController->send_mail_create_ticket_form($newData);
                if ($request->call_type == 'CF-Warranty Claim') {
                    $this->send_warranty_email($request->email, $subject, $request->body);
                } else if ($request->call_type == 'Parts') {
                    $this->send_parts_email($request->email, $subject, $request->body);
                }
            }

            return response()->json([
                'result' => $data,
                array_merge($request->all(), [
                    'user_id' => $account->id,
                ]),
                'ticket_id' => $subject
            ], 200);
        } else {
            $data = Ticket::create(array_merge($request->all(), [
                'user_id' => $this->queueing($request->call_type),
                'status' => $validation,
                'cases_status' => 'handled'
            ]));

            Activity::create([
                'user_id' => $request->user['id'] ?? 0,
                'ticket_id' => $data->id,
                'type' => 'TICKET CREATED',
                'message' => json_encode($data)
            ]);


            $subject = '';
            $length = strlen($data->id);
            $id = '';
            if ($length == 1) {
                $id = date("dmy") . '00000' . $data->id;
            } else if ($length == 2) {
                $id = date("dmy") . '0000' . $data->id;
            } else if ($length == 3) {
                $id = date("dmy") . '000' . $data->id;
            }

            if ($request->call_type == 'Parts') {
                $subject = 'PS' . $id;
            } else if ($request->call_type == 'CF-Warranty Claim') {
                $subject = 'CF' . $id;
            } else if ($request->call_type == 'TS-Tech Support') {
                $subject = 'TS' . $id;
            }

            $t = Ticket::where('id', $data->id)->first();
            $t->update([
                'ticket_id' => $subject
            ]);


            $account = User::where('email', '=', $t->email)->first();
            AgentNote::create([
                'user_id' => $account->id,
                'ticket_id' => $data->id,
                'message' => $request->remarks,
            ]);

            if ($request->isSendEmail == 'true' || $request->isSendEmail == true  || $request->email && $request->isSendEmail) {
                // $newData = array_merge($user->toArray(), [
                //     'id' => $data->id,
                //     'ticket_id' => $tt->ticket_id,
                //     'call_type' => $request->call_type,
                //     'isSendEmail' => $request->isSendEmail,
                //     'isHasEmail' => $request->isHasEmail,
                // ]);

                // $emailController = App::make(EmailTemplateController::class);
                // $emailController->send_mail_create_ticket_form($newData);
                if ($request->call_type == 'CF-Warranty Claim') {
                    $this->send_warranty_email($request->email, $subject, $request->body);
                } else if ($request->call_type == 'Parts') {
                    $this->send_parts_email($request->email, $subject, $request->body);
                }
            }

            return response()->json([
                'result' => $data,
                'ticket_id' => $subject
            ], 200);
        }
    }
}

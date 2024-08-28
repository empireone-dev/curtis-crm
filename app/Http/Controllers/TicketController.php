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

    public function get_tickets_warehouse($country)
    {
        // Define the warehouse status based on the country
        $status = ($country == 'CA') ? 'CA WAREHOUSE' : (($country == 'US') ? 'US WAREHOUSE' : null);

        if ($status) {
            $query = Ticket::where([['status', '=', $status], ['country', '=', $country]])
                ->with(['refund', 'repair', 'receipt', 'replacement', 'decision_making', 'user']);
            $data = $query->get();
        } else {
            $data = [];
        }

        return response()->json([
            'data' => $data,
        ], 200);
    }

    public function get_ticket_by_id($id)
    {
        $tickets = Ticket::where('id', $id)->with(['refund', 'repair', 'receipt', 'replacement', 'decision_making', 'user', 'internal'])->first();

        return response()->json([
            'result' => $tickets
        ], 200);
    }

    public function search_lookup_tickets(Request $request)
    {
        $query = Ticket::query();

        // Apply filters based on request inputs
        if (isset($request->ticket_id)) {
            $query->where('ticket_id', $request->input('ticket_id'));
            $tickets = $query->get();
        }

        if (isset($request->phone)) {
            $query->orWhere('phone', $request->input('phone'));
            $tickets = $query->get();
        }

        if (isset($request->email)) {
            $query->orWhere('email', $request->input('email'));
            $tickets = $query->get();
        }

        if (isset($request->serial_number)) {
            $query->orWhere('serial_number', $request->input('serial_number'));
            $tickets = $query->get();
        }

        if (isset($request->model)) {
            $query->orWhere('model', $request->input('model'));
            $tickets = $query->get();
        }

        if (isset($request->fname)) {
            $query->orWhere('fname', $request->input('fname'));
            $tickets = $query->get();
        }

        if (isset($request->lname)) {
            $query->orWhere('lname', $request->input('lname'));
            $tickets = $query->get();
        }

        return response()->json([
            'result' => $tickets
        ], 200);
    }
    public function check_serial_number($serial_number)
    {
        $ticket = Ticket::where('serial_number', $serial_number)->first();
        return response()->json([
            'result' => $ticket
        ], 200);
    }
    public function resend_email_templete(Request $request)
    {
        if ($request->call_type == 'CF-Warranty Claim') {
            $this->send_warranty_email($request->recipient, $request->subject, $request->body);
        } else if ($request->call_type == 'Parts') {
            $this->send_parts_email($request->recipient, $request->subject, $request->body);
        }
        return response()->json([
            'result' => 'success'
        ], 200);
    }

    public function send_warranty_email($recipient, $subject, $body)
    {
        $scriptUrl = 'https://script.google.com/macros/s/AKfycbzC4HbxcxX44BQm-bGFeYbUAGy8DyExb-Als9sYN1IOMZuVs2j3Dq9TFiShCTm06MBT/exec';

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
        $scriptUrl = 'https://script.google.com/macros/s/AKfycbwHxDNcPirzDBeLgiEaqTZN8ZVIxKO1UyDXZ2ErYIlwqY19pHNYUEdg7-C1w3KXyQXO/exec';
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
        $move = $ticket->move_status ? $ticket->call_type . ' move to ' . $request->call_type : $ticket->call_type . ' move to ' . $request->call_type;
        $ticket->update([
            'user_id' => $this->queueing($request->call_type),
            'call_type' => $request->call_type,
            'move_status' => $move,
            'status' => $request->call_type == 'CF-Warranty Claim' ? 'WARRANTY VALIDATION' : ($request->call_type == 'Parts' ? 'PARTS VALIDATION' : 'TECH VALIDATION')
        ]);
        Activity::create([
            'user_id' => $request->user['id'],
            'ticket_id' => $request->ticket_id,
            'type' => 'TRANSFER TICKET',
            'message' => $move
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
    }
    public function verify_tickets(Request $request)
    {
        $export = ExportFile::where('export_name', $request->searchData)->first();

        $searchQuery = $request->search;

        // Get all column names of the table
        $columns = Schema::getColumnListing('tickets');

        // Start the query builder
        $query = Ticket::query()->with(['refund', 'repair', 'receipt', 'replacement', 'decision_making', 'user', 'activity']);
        if ($searchQuery) {
            // Dynamically add where conditions for each column
            $query->where(function ($query) use ($columns, $searchQuery) {
                foreach ($columns as $column) {
                    if ($searchQuery == 'WARRANTY VALIDATION') {
                        $query->orWhere($column, '=',  $searchQuery);
                    } else if ($searchQuery == 'OPEN WARRANTY') {
                        $query->orWhere([['call_type', '=', 'CF-Warranty Claim'], ['status', '=', 'WARRANTY VALIDATION']]);
                    } else if ($searchQuery == 'REFUND') {
                        $query->orWhere([['call_type', '=', 'CF-Warranty Claim'], ['status', '=', 'REFUND']]);
                    } else if ($searchQuery == 'REPLACEMENT') {
                        $query->orWhere([['call_type', '=', 'CF-Warranty Claim'], ['status', '=', 'REPLACEMENT']]);
                    } else if ($searchQuery == 'OPEN PARTS') {
                        $query->orWhere([['call_type', '=', 'Parts'], ['status', '=', 'PARTS VALIDATION']]);
                    } else if ($searchQuery == 'OPEN TECH') {
                        $query->orWhere([['call_type', '=', 'TS-Tech Support'], ['status', '=', 'TECH VALIDATION']]);
                    } else {
                        $query->orWhere([[$column, '=',  $searchQuery]]);
                    }
                }
                $query->orWhere('ticket_id', '=', $searchQuery);
                $query->orWhereRaw('REGEXP_REPLACE(phone, "[^0-9]", "") = ?', [$searchQuery]);
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
        $data = $query->get();
        foreach ($data as $result) {
            if (isset($result->activity->user_id)) {
                $activity = Activity::where('user_id', '=', $result->activity->user_id)
                    ->where('type', '=', 'WARRANTY VALIDATION')
                    ->first();

                if (isset($activity->user_id)) {
                    $object = json_decode($activity->message);
                    $user = User::where('id', $result->activity->user_id)->first();
                    if ($user['agent_type'] == 'Warranty') {
                        $result['validator'] = $user;
                    } else {
                        $user2 = User::where('emp_id', $object->emp_id)->first();
                        $result['validator'] = $user2;
                    }
                }
            }
        }

        if ($export) {
            return response()->json([
                'data' => $data ?? [],
                'result' => 'exist'
            ], 200);
        } else {
            return response()->json([
                'data' => $data ?? [],
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
        } else {
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

        // Activity::create([
        //     'user_id' => $request->user['id'],
        //     'ticket_id' => $id,
        //     'type' => $request->type,
        //     'message' => json_encode($request->all())
        // ]);
        Activity::create([
            'user_id' => $request->user['id'],
            'ticket_id' => $id,
            'type' => 'TICKET CLOSED',
            'message' => $request->reason
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
    public function get_tickets_by_warehouse(Request $request, $country)
    {
        // $ticket = Ticket::where([
        //     ['country','=',$country],
        //     ['status','=','WAREHOUSE']
        // ])->get();
        if ($request->search) {
            $ticket = Ticket::where([
                ['country', '=', $country],
                ['ticket_id', '=', $request->search],
                ['status', '=', $country == 'CA' ? 'CA WAREHOUSE' : 'US WAREHOUSE']
            ])->get();
        } else {
            $ticket = Ticket::where([
                ['country', '=', $country],
                ['status', '=', $country == 'CA' ? 'CA WAREHOUSE' : 'US WAREHOUSE']
            ])->get();
        }


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

    public function get_tickets_by_ticket_details_id($ticket_id)
    {
        $ticket = Ticket::where('ticket_id', $ticket_id)->with(['decision_making', 'replacement', 'receipt', 'refund', 'repair'])->first();
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
        $query = Ticket::query()->with(['refund', 'repair', 'receipt', 'replacement', 'decision_making', 'user']);
        if ($searchQuery) {
            // Dynamically add where conditions for each column
            $query->where(function ($query) use ($columns, $searchQuery) {
                foreach ($columns as $column) {
                    if ($searchQuery == 'WARRANTY VALIDATION') {
                        $query->orWhere($column, '=',  $searchQuery);
                    } else if ($searchQuery == 'OPEN WARRANTY') {
                        $query->orWhere([['call_type', '=', 'CF-Warranty Claim'], ['status', '=', 'WARRANTY VALIDATION']]);
                    } else if ($searchQuery == 'REFUND') {
                        $query->orWhere([['call_type', '=', 'CF-Warranty Claim'], ['status', '=', 'REFUND']]);
                    } else if ($searchQuery == 'REPLACEMENT') {
                        $query->orWhere([['call_type', '=', 'CF-Warranty Claim'], ['status', '=', 'REPLACEMENT']]);
                    } else if ($searchQuery == 'OPEN PARTS') {
                        $query->orWhere([['call_type', '=', 'Parts'], ['status', '=', 'PARTS VALIDATION']]);
                    } else if ($searchQuery == 'OPEN TECH') {
                        $query->orWhere([['call_type', '=', 'TS-Tech Support'], ['status', '=', 'TECH VALIDATION']]);
                    } else if ($searchQuery == 'WARRANTY CLOSED') {
                        $query->orWhere([['call_type', '=', 'CF-Warranty Claim'], ['status', '=', 'CLOSED']]);
                    } else if ($searchQuery == 'PARTS CLOSED') {
                        $query->orWhere([['call_type', '=', 'Parts'], ['status', '=', 'CLOSED']]);
                    } else if ($searchQuery == 'TECH CLOSED') {
                        $query->orWhere([['call_type', '=', 'TS-Tech Support'], ['status', '=', 'CLOSED']]);
                    } else {
                        $query->orWhere([[$column, '=',  $searchQuery]]);
                    }
                }
                $query->orWhere('ticket_id', '=', $searchQuery);
                $query->orWhereRaw('REGEXP_REPLACE(phone, "[^0-9]", "") = ?', [$searchQuery]);
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

        // $query->orderBy('is_reply', 'desc')
        //     ->orderBy('email_date', 'asc')
        //     ->orderByRaw("CASE WHEN status = 'CLOSED' THEN 1 ELSE 0 END ASC")
        //     ->orderBy('status', 'asc');
        $query->with('pr')->orderBy('updated_at', 'desc');
        $data = $query->with('pr')->paginate(10);

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
    public function sample()
    {
        $scriptUrl = 'https://script.google.com/macros/s/AKfycbwoOxgrnC0siE7sFm2-c9h16Vko8HchnQm6TEen2vo0zEEjRejUC8l-v9zUVeKydRtg/exec';

        $response = Http::get($scriptUrl);
        $responseData = $response->json();
        foreach ($responseData as $value) {
            $ticket = Ticket::where('ticket_id', $value['ticket_id'])->first();
            if ($ticket) {
                if ($value['email'] == 'support2@curtiscs.com') {
                    $ticket->update([
                        'cases_status' => 'hidden',
                        'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
                        'is_reply' => null
                    ]);
                } else {
                    $ticket->update([
                        'cases_status' => 'handled',
                        'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
                        'is_reply' => 'true'
                    ]);
                }
            }
        }
        return response()->json([
            'result' => $responseData,
        ], 200);
    }

    public function get_email_replies()
    // {
    //     $scriptUrl = 'https://script.google.com/macros/s/AKfycbyKdXAqyj9XWSksiamUAH-yyzT1HCCMiS4O9nldax9Jwwb-xW2lLaS7ifPsbobQ2MPL/exec';

    //     $response = Http::get($scriptUrl);
    //     $responseData = $response->json();
    //     foreach ($responseData as $value) {
    //         $ticket = Ticket::where('ticket_id', $value['ticket_id'])->first();
    //         if ($ticket) {
    //             $ticket->update([
    //                 'cases_status' => 'handled',
    //                 'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
    //                 'is_reply' => 'true'
    //             ]);
    //         }
    //     }
    //     return response()->json([
    //         'result' => $responseData,
    //     ], 200);
    // }
    {
        $scriptUrl = 'https://script.google.com/macros/s/AKfycbxob6vQdgkIdYj8jPlG2yAOCytLxTeS6AhQLO0lEJbrabk-GpTODq3-yhgNJexjfLIR/exec';

        $response = Http::get($scriptUrl);
        $responseData = $response->json();
        foreach ($responseData as $value) {
            $ticket = Ticket::where('ticket_id', $value['ticket_id'])->first();
            if ($ticket) {
                if ($value['email'] == 'support2@curtiscs.com') {
                    $ticket->update([
                        'cases_status' => 'hidden',
                        'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
                        'is_reply' => null
                    ]);
                } else {
                    $ticket->update([
                        'cases_status' => 'handled',
                        'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
                        'is_reply' => 'true'
                    ]);
                }
            }
        }
        return response()->json([
            'result' => $responseData,
        ], 200);
    }

    public function get_email_replies_parts()
    // {
    //     $scriptUrl = 'https://script.google.com/macros/s/AKfycbwtrx6YKdaT93NX7Zq8mdmZJ3Gh59Nev60WMrXqz57xYncY4D168eSTTVWAPgu0lsNa/exec';

    //     $response = Http::get($scriptUrl);
    //     $responseData = $response->json();
    //     foreach ($responseData as $value) {
    //         $ticket = Ticket::where('ticket_id', $value['ticket_id'])->first();
    //         if ($ticket) {
    //             $ticket->update([
    //                 'cases_status' => 'handled',
    //                 'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
    //                 'is_reply' => 'true'
    //             ]);
    //         }
    //     }
    //     return response()->json([
    //         'result' => $responseData,
    //     ], 200);
    // }
    {
        $scriptUrl = 'https://script.google.com/macros/s/AKfycbyJfgd2C_FjuibQGtV82kZBcn5Eh952SEReHBlN8RBMrEZGMcBBdv1GCP71GzpQiGc/exec';

        $response = Http::get($scriptUrl);
        $responseData = $response->json();
        foreach ($responseData as $value) {
            $ticket = Ticket::where('ticket_id', $value['ticket_id'])->first();
            if ($ticket) {
                if ($value['email'] == 'support2@curtiscs.com') {
                    $ticket->update([
                        'cases_status' => 'hidden',
                        'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
                        'is_reply' => null
                    ]);
                } else {
                    $ticket->update([
                        'cases_status' => 'handled',
                        'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
                        'is_reply' => 'true'
                    ]);
                }
            }
        }
        return response()->json([
            'result' => $responseData,
        ], 200);
    }
    public function cases(Request $request)
    {
        // Number of results per page
        $perPage = 10;
        $data = [];
        $user = User::where('id', $request->user_id)->first();
        $today = Carbon::today()->toDateString();

        if ($user->agent_type == 'Warranty') {
            $call_type = 'CF-Warranty Claim';
        } elseif ($user->agent_type == 'Parts') {
            $call_type = 'Parts';
        } else {
            $call_type = 'Tech';
        }

        if ($request->cases == 'open_cases') {
            $dataQuery = Ticket::where([
                ['user_id', '=', $request->user_id],
                ['status', '<>', 'CLOSED'],
                ['ticket_id', '<>', null],
                ['call_type', '=', $call_type],
                ['cases_status', '<>', 'hide'],
                ['is_reply', '=', 'true'],
            ])
                ->orderBy('email_date', 'asc');


            $dataQueryCount = $dataQuery->count();

            $dataQuery = $dataQuery->get();
            return response()->json([
                'data_count' => count($data),
                'ticket_count' => $dataQueryCount,
                'result' =>  $dataQuery,
            ], 200);
        } else  if ($request->cases == 'over_due') {
            $overdue_cases = Ticket::where([
                ['user_id', '=', $user->id],
                ['status', '<>', 'CLOSED'],
                ['ticket_id', '<>', null],
                ['cases_status', '<>', 'hide'],
                ['is_reply', '=', 'true'],
                ['call_type', '=', $user->agent_type == 'Warranty' ? 'CF-Warranty Claim' : 'Parts'],
            ])->get();

            foreach ($overdue_cases as &$value) {
                $emailDate = Carbon::parse($value->email_date);
                $dayOfWeek = $emailDate->dayOfWeekIso;
                if ($dayOfWeek == 4 || $dayOfWeek == 5) {
                    $addDay = 4;
                } elseif ($dayOfWeek == 6) {
                    $addDay = 3;
                } elseif ($dayOfWeek == 7) {
                    $addDay = 2;
                } else {
                    $addDay = 2;
                }
                $value->email_date = $emailDate->addDays($addDay)->format('Y-m-d');
            }
            $overdue_cases = $overdue_cases->filter(function ($ticket) use ($today) {
                return $ticket->email_date < $today;
            });
            return response()->json([
                'data_count' => count($overdue_cases),
                'ticket_count' => 100,
                'result' =>  $overdue_cases,
            ], 200);
        } else  if ($request->cases == 'due_today') {
            $cases_due_today = Ticket::where([
                ['user_id', '=', $user->id],
                ['status', '<>', 'CLOSED'],
                ['ticket_id', '<>', null],
                ['cases_status', '<>', 'hide'],
                ['is_reply', '=', 'true'],
                ['call_type', '=', $user->agent_type == 'Warranty' ? 'CF-Warranty Claim' : 'Parts'],
            ])->get();

            foreach ($cases_due_today as &$value) {
                $emailDate = Carbon::parse($value->email_date);
                $dayOfWeek = $emailDate->dayOfWeekIso;

                // Determine the number of days to add
                if ($dayOfWeek == 4 || $dayOfWeek == 5) {
                    $addDay = 4;
                } elseif ($dayOfWeek == 6) {
                    $addDay = 3;
                } elseif ($dayOfWeek == 7) {
                    $addDay = 2;
                } else {
                    $addDay = 2;
                }
                $value->email_date = $emailDate->addDays($addDay)->format('Y-m-d');
            }
            $cases_due_today = $cases_due_today->filter(function ($ticket) use ($today) {
                return $ticket->email_date === $today;
            });
            return response()->json([
                'data_count' => count($cases_due_today),
                'ticket_count' => 100,
                'result' =>  $cases_due_today,
            ], 200);
        }
    }
    public function show(Request $request, $id)
    {
        $searchQuery = $request->input('search');

        // Get all column names of the table
        $columns = Schema::getColumnListing('tickets');

        // Start the query builder
        if (isset($searchQuery)) {
            $query = Ticket::query();
        } else {
            $query = Ticket::where('user_id', $id);
        }


        $user = User::where('id', $id)->first();
        if ($searchQuery) {
            // Dynamically add where conditions for each column
            $query->where(function ($query) use ($columns, $searchQuery) {
                foreach ($columns as $column) {
                    if ($searchQuery == 'WARRANTY VALIDATION') {
                        $query->orWhere($column, '=', $searchQuery);
                    } elseif ($searchQuery == 'OPEN WARRANTY') {
                        $query->orWhere([['call_type', '=', 'CF-Warranty Claim'], ['status', '=', 'WARRANTY VALIDATION']]);
                    } elseif ($searchQuery == 'OPEN PARTS') {
                        $query->orWhere([['call_type', '=', 'Parts'], ['status', '=', 'PARTS VALIDATION']]);
                    } elseif ($searchQuery == 'OPEN TECH') {
                        $query->orWhere([['call_type', '=', 'TS-Tech Support'], ['status', '=', 'TECH VALIDATION']]);
                    } elseif ($searchQuery == 'CALLBACK') {
                        $query->orWhere([['call_type', '=', 'Parts'], ['status', '=', 'CALLBACK']]);
                    } elseif ($searchQuery == 'INTERNALS') {
                        $query->orWhere([['call_type', '=', 'Parts'], ['status', '=', 'INTERNALS']]);
                    } elseif ($searchQuery == 'CLOSED') {
                        $query->orWhere([['call_type', '=', 'Parts'], ['status', '=', 'CLOSED']]);
                    } else {
                        $query->orWhere($column, 'like', '%' . $searchQuery . '%');
                    }
                }
                $query->orWhere('ticket_id', $searchQuery)
                    ->orWhere('phone', $searchQuery);
            });
        }

        if ($request->start && $request->end) {
            $startTime = Carbon::createFromFormat('Y-m-d', $request->start)->startOfDay();
            $endTime = Carbon::createFromFormat('Y-m-d', $request->end)->endOfDay();
            $query->whereBetween('created_at', [$startTime, $endTime]);
        }

        // Add item_number condition if provided
        if ($request->model && !in_array($request->model, ['null', 'undefined'])) {
            $models = explode(',', $request->model);
            $query->whereIn('item_number', $models);
        }

        if ($request->call_type && !in_array($request->call_type, ['null', 'undefined'])) {
            $query->where('call_type', $request->call_type);
        }

        if ($request->status && !in_array($request->status, ['null', 'undefined'])) {
            $query->where('status', $request->status);
        }

        if (in_array($request->status, ['WEB FORM', 'AGENT FORM'])) {
            $query->orWhere('created_from', $request->status);
        }
        if ($user->role_id == 5) {
            if ($searchQuery == 'CLOSED') {
                $query->where('status', '=', 'CLOSED');
            } else {
                if (!isset($searchQuery)) {
                    $query->where('status', '<>', 'CLOSED');
                }
                // $query->where('status','=', 'CLOSED');
            }
            $query->with('pr')->orderBy('updated_at', 'desc');
            $data = $query->get();
        } else {
            // $query->orderBy('is_reply', 'desc')
            // ->orderBy('email_date', 'asc')
            // ->orderByRaw("CASE WHEN status = 'CLOSED' THEN 1 ELSE 0 END ASC")
            // ->orderBy('status', 'asc');
            $query->with('pr')->orderBy('updated_at', 'desc');
            $data = $query->paginate(10);
        }


        return response()->json([
            'result' => $data ?? [],
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
        $validation = $this->getValidation($request->call_type);

        if ((!$user && $request->isHasEmail === true) || (!$user && $request->isHasEmail === 'true')) {
            // $account = $this->createUserAccount($request);
            $data = $this->createTicket($request, $validation);
            $subject = $this->generateSubject($request->call_type, $data->id);

            $this->sendEmailIfNeeded($request, $subject);
            $this->updateTicket($data->id, $subject);

            if ($request->user()) {
                AgentNote::create([
                    'user_id' => $request->user['id'] ?? 0,
                    'ticket_id' => $data->id,
                    'message' => $request->remarks,
                ]);
                Activity::create([
                    'user_id' => $request->user['id'] ?? 0,
                    'ticket_id' => $data->id,
                    'type' => 'TICKET CREATED',
                    'message' => json_encode($data)
                ]);
            }


            return response()->json([
                'result' => $data,
                array_merge($request->all(), [
                    // 'user_id' => $account->id,
                    'user_id' => 0,
                ]),
                'ticket_id' => $subject,
            ], 200);
        } else {
            $data = $this->createTicket($request, $validation);
            $subject = $this->generateSubject($request->call_type, $data->id);

            $this->sendEmailIfNeeded($request, $subject);
            $this->updateTicket($data->id, $subject);

            if ($request->user()) {
                AgentNote::create([
                    'user_id' => $request->user['id'] ?? 0,
                    'ticket_id' => $data->id,
                    'message' => $request->remarks,
                ]);
                Activity::create([
                    'user_id' => $request->user['id'] ?? 0,
                    'ticket_id' => $data->id,
                    'type' => 'TICKET CREATED',
                    'message' => json_encode($data)
                ]);
            }


            // $account = $this->createUserAccount($request);
            return response()->json([
                'result' => $data,
                'ticket_id' => $subject,
            ], 200);
        }
    }

    private function getValidation($callType)
    {
        switch ($callType) {
            case 'Parts':
                return 'PARTS VALIDATION';
            case 'CF-Warranty Claim':
                return 'WARRANTY VALIDATION';
            case 'TS-Tech Support':
                return 'TECH VALIDATION';
            default:
                return $callType;
        }
    }

    private function createUserAccount($request)
    {
        return User::create([
            'name' => $request->fname ?? '' . ' ' . $request->lname ?? '',
            'email' => $request->email ?? '',
            'password' => Hash::make('12345678'),
            'role_id' => '2',
            'address' => $request->address ?? '',
            'city' => $request->city ?? '',
            'zip_code' => $request->zip_code ?? '',
            'country' => $request->country ?? '',
        ]);
    }

    private function createTicket($request, $validation)
    {
        return Ticket::create(array_merge($request->all(), [
            'user_id' => $this->queueing($request->call_type),
            'status' => $validation,
            'cases_status' => 'handled'
        ]));
    }

    private function generateSubject($callType, $ticketId)
    {
        $idLength = strlen($ticketId);
        $leadingZeros = str_repeat('0', 6 - $idLength);
        $id = date("dmy") . $leadingZeros . $ticketId;

        switch ($callType) {
            case 'Parts':
                return 'PS' . $id;
            case 'CF-Warranty Claim':
                return 'CF' . $id;
            case 'TS-Tech Support':
                return 'TS' . $id;
            case 'General Inquiry':
                return '';
            default:
                return $callType === null ? 'CF' . $id : '';
        }
    }

    private function updateTicket($ticketId, $subject)
    {
        $ticket = Ticket::where('id', $ticketId)->first();
        if ($ticket) {
            $ticket->update(['ticket_id' => $subject]);
            if ($ticket->ticket_id === null) {
                $ticket->update(['ticket_id' => $subject]);
            }
        }
    }

    private function sendEmailIfNeeded($request, $subject)
    {
        if ($request->isSendEmail == 'true' || $request->isSendEmail == true || $request->email && $request->isSendEmail) {
            if ($request->call_type == 'CF-Warranty Claim') {
                $this->send_warranty_email($request->email, $subject, $request->body);
            } else if ($request->call_type == 'Parts') {
                $this->send_parts_email($request->email, $subject, $request->body);
            }
        }
    }



    public function create_ticket_close(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        $account = [];


        $validation = '';
        switch ($request->call_type) {
            case 'Parts':
                $validation = 'PARTS VALIDATION';
                break;
            case 'CF-Warranty Claim':
                $validation = 'WARRANTY VALIDATION';
                break;
            case 'TS-Tech Support':
                $validation = 'TECH VALIDATION';
                break;
            default:
                $validation = $request->call_type;
                break;
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
                'status' => 'CLOSED',
                'reason_to_close' => $request->reason,
                'cases_status' => 'handled',
            ]));

            // Activity::create([
            //     'user_id' => $request->user['id'],
            //     'ticket_id' => $data->id,
            //     'type' => 'TICKET CREATED',
            //     'message' => json_encode($data)
            // ]);

            Activity::create([
                'user_id' => $request->user['id'],
                'ticket_id' => $data->id,
                'type' => 'TICKET CLOSED',
                'message' => $request->reason
            ]);

            $subject = '';
            $idLength = strlen($data->id);
            $leadingZeros = str_repeat('0', 6 - $idLength); // Calculate the number of leading zeros needed
            $id = date("dmy") . $leadingZeros . $data->id;

            if ($request->call_type == 'Parts') {
                $subject = 'PS' . $id;
            } else if ($request->call_type == 'CF-Warranty Claim') {
                $subject = 'CF' . $id;
            } else if ($request->call_type == 'TS-Tech Support') {
                $subject = 'TS' . $id;
            } else if ($request->call_type == 'General Inquiry') {
                // $subject = 'GI' . $id;
                $subject = '';
            } else {
                // $subject = 'ETC' . $id;
            }

            $t = Ticket::where('id', $data->id)->first();
            $t->update([
                'ticket_id' => $subject,
            ]);

            AgentNote::create([
                'user_id' => $account->id,
                'ticket_id' => $data->id,
                'message' => $request->remarks,
            ]);
            if ($request->isSendEmail == 'true' || $request->isSendEmail == true || $request->email && $request->isSendEmail) {

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
                'status' => 'CLOSED',
                'reason_to_close' => $request->reason,
                'cases_status' => 'handled'
            ]));


            Activity::create([
                'user_id' => $request->user['id'],
                'ticket_id' => $data->id,
                'type' => 'TICKET CLOSED',
                'message' => $request->reason
            ]);


            $subject = '';
            $idLength = strlen($data->id);
            $leadingZeros = str_repeat('0', 6 - $idLength); // Calculate the number of leading zeros needed
            $id = date("dmy") . $leadingZeros . $data->id;

            if ($request->call_type == 'Parts') {
                $subject = 'PS' . $id;
            } else if ($request->call_type == 'CF-Warranty Claim') {
                $subject = 'CF' . $id;
            } else if ($request->call_type == 'TS-Tech Support') {
                $subject = 'TS' . $id;
            } else if ($request->call_type == 'General Inquiry') {
                // $subject = 'GI' . $id;
                $subject = '';
            } else {
                // $subject = 'ETC' . $id;
                $subject = '';
            }

            $t = Ticket::where('id', $data->id)->first();
            $t->update([
                'ticket_id' => $subject,
                // 'status' => ($request->call_type == 'General Inquiry' || $request->call_type == 'Others') ? 'CLOSED' : $request->status
            ]);


            $account = User::where('email', '=', $t->email)->first();
            AgentNote::create([
                'user_id' => $account->id,
                'ticket_id' => $data->id,
                'message' => $request->remarks,
            ]);

            if ($request->isSendEmail == 'true' || $request->isSendEmail == true  || $request->email && $request->isSendEmail) {
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

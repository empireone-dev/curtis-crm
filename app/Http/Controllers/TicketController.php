<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\DecisionMaking;
use App\Models\Replacement;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class TicketController extends Controller
{


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
            $result = Ticket::where([['asc_id', '=', $request->id], ['decision_status', '=',  $status]])->get();
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

        if ($request->data) {
            Activity::create([
                'user_id' => $request->data['account']['id'],
                'ticket_id' => $id,
                'type' => 'REPLACEMENT NOT SHIPPED',
                'message' => json_encode(array_merge($ticketArray, ['replacement' => $request->data]))
            ]);
        }

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
                    } else {
                        $query->orWhere([[$column, '=',  $searchQuery]]);
                    }
                }
            });
        }
        // Paginate the results
        $data = $query->paginate(10);

        return response()->json([
            'data' => $data ?? [],
        ], 200);
    }
    public function show(Request $request, $id)
    {
        if ($request->search) {
            $data = Ticket::where([['status', '=', $request->search], ['user_id', '=', $id]])->get();
        } else {
            $data = Ticket::where('user_id', '=', $id)->get();
        }
        return response()->json([
            'result' => $data,
        ], 200);
    }

    public function queueing()
    {
        $users = User::where('role_id', '=', 5)->get();
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
        }
        if ($request->call_type == 'TS-Tech Support') {
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
                'user_id' => $this->queueing(),
                'status' => $validation
            ]));

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
                $subject = '#PS' . $id;
            } else if ($request->call_type == 'CF-Warranty Claim') {
                $subject = '#CF' . $id;
            } else if ($request->call_type == 'TS-Tech Support') {
                $subject = '#TS' . $id;
            }

            $t = Ticket::where('id', $data->id)->first();
            $tt = Ticket::where('id', $data->id)->first();
            $t->update([
                'ticket_id' => $subject
            ]);

            if ($request->isSendEmail == 'true' || $request->isSendEmail == true) {
                $newData = array_merge($account->toArray(), [
                    'id' => $data->id,
                    'ticket_id' => $tt->ticket_id,
                    'call_type' => $request->call_type,
                    'isSendEmail' => $request->isSendEmail,
                    'isHasEmail' => $request->isHasEmail,
                ]);

                $emailController = App::make(EmailTemplateController::class);
                $emailController->send_mail_create_ticket_form($newData);
            }

            return response()->json([
                'result' => $data,
                array_merge($request->all(), [
                    'user_id' => $account->id,
                ])
            ], 200);
        } else {
            $data = Ticket::create(array_merge($request->all(), [
                'user_id' => $this->queueing(),
                'status' => $validation
            ]));

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
                $subject = '#PS' . $id;
            } else if ($request->call_type == 'CF-Warranty Claim') {
                $subject = '#CF' . $id;
            } else if ($request->call_type == 'TS-Tech Support') {
                $subject = '#TS' . $id;
            }

            $t = Ticket::where('id', $data->id)->first();
            $t->update([
                'ticket_id' => $subject
            ]);
            $tt = Ticket::where('id', $data->id)->first();
            if ($request->isSendEmail == 'true' || $request->isSendEmail == true) {
                $newData = array_merge($user->toArray(), [
                    'id' => $data->id,
                    'ticket_id' => $tt->ticket_id,
                    'call_type' => $request->call_type,
                    'isSendEmail' => $request->isSendEmail,
                    'isHasEmail' => $request->isHasEmail,
                ]);

                $emailController = App::make(EmailTemplateController::class);
                $emailController->send_mail_create_ticket_form($newData);
            }

            return response()->json([
                'result' => $data,
            ], 200);
        }
    }
}

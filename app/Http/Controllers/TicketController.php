<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;

class TicketController extends Controller
{

    
    public function get_tickets_by_warehouse($country){
        // $ticket = Ticket::where([
        //     ['country','=',$country],
        //     ['status','=','WAREHOUSE']
        // ])->get();
        $ticket = Ticket::where('country','=',$country)->get();
        return response()->json([
            'result' => $ticket
        ], 200);
    }
    public function get_tickets_by_ticket_id($ticket_id)
    {
        $ticket = Ticket::where('id', $ticket_id)->first();
        return response()->json([
            'result' => $ticket
        ], 200);
    }

    public function update_tickets_status(Request $request, $id)
    {
        $ticket = Ticket::where('id', $id)->first();
        $ticket->update([
            'status' => $request->status
        ]);
        $user = User::find($request->user_id);
        // $user_id,$ticket_id,$message,$type
        ActivityController::create_activity(
            $request->user_id,
            $id,
            strtoupper($user->name) . ' MOVE TO ' . $request->status,
            $request->status
        );

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
        $tickets = Ticket::query();
        if ($request->ticket_id == 'null') {
            $data = $tickets->paginate(10);
            return response()->json($data, 200);
        } else {
            $data = Ticket::where('id', $request->ticket_id)->get();
            return response()->json([
                'data' => $data
            ], 200);
        }
    }
    public function show($id)
    {

        $data = Ticket::where('user_id', $id)->get();
        return response()->json([
            'result' => $data
        ], 200);
    }


    public function store(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        $account = [];
        $newData = [];
        
        $ticket_id = '';
        if($request->call_type == 'Parts'){
            $ticket_id = '#PS'.date("dmy").'0';
        }else if($request->call_type == 'CF-Warranty Claim'){
            $ticket_id = '#CF'.date("dmy").'0';
        }else if($request->call_type == 'TS-Tech Support'){
            $ticket_id = '#TS'.date("dmy").'0';
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
            ]);

            $data = Ticket::create(array_merge($request->all(), [
                'user_id' => $account->id,
            ]));

            $t = Ticket::where('id',$data->id)->first();
            $tt = Ticket::where('id',$data->id)->first();
            $t->update([
                'ticket_id' => $ticket_id.$t->id
            ]);

            if ($request->isSendEmail == 'true' || $request->isSendEmail == true) {
                $newData = array_merge($account->toArray(), [
                    'id' => $data->id,
                    'ticket_id'=>$tt->ticket_id,
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
                'user_id' => $user->id,
            ]));

            $t = Ticket::where('id',$data->id)->first();
            $t->update([
                'ticket_id' => $ticket_id.$t->id
            ]);
            $tt = Ticket::where('id',$data->id)->first();
            if ($request->isSendEmail == 'true' || $request->isSendEmail == true) {
                $newData = array_merge($user->toArray(), [
                    'id' => $data->id,
                    'ticket_id'=>$tt->ticket_id,
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

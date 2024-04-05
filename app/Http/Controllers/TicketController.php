<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;

class TicketController extends Controller
{


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

            if ($request->isSendEmail == 'true' || $request->isSendEmail == true) {
                $newData = array_merge($account->toArray(), [
                    'id' => $data->id,
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

            if ($request->isSendEmail == 'true' || $request->isSendEmail == true) {
                $newData = array_merge($user->toArray(), [
                    'id' => $data->id,
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

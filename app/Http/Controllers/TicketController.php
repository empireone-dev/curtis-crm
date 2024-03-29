<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;

class TicketController extends Controller
{

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


    public function store(Request $request)
    {
        $data = Ticket::create($request->all());
        $user = User::where('email', $request->email)->first();
        $account = [];
        $newData = [];
        if (!$user) {
            $account = User::create([
                'name' => $data->fname . ' ' . $data->lname,
                'email' => $data->email,
                'password' => Hash::make('12345678'),
                'role_id' => '2',
                'address' => $data->address,
                'city' => $data->city,
                'zip_code' => $data->zip_code,
            ]);
            $newData = array_merge($account->toArray(), [
                'id' => $data->id,
                'call_type' => $request->call_type
            ]);
        } else {
            $newData = array_merge($user->toArray(), [
                'id' => $data->id,
                'call_type' => $request->call_type
            ]);
        }

        $emailController = App::make(EmailTemplateController::class);
        $emailController->send_mail_create_ticket_form($newData);
        return response()->json([
            'result' =>  $newData,
        ], 200);
    }
}

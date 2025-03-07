<?php

namespace App\Http\Controllers;

use App\Models\DirectEmail;
use App\Models\Ticket;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AppScriptController extends Controller
{
    public function get_warranty_unread_email(Request $request)
    {

        foreach ($request->all() as $value) {
            $ticket = Ticket::where('ticket_id', $value['ticket_id'])->first();
            if ($ticket) {
                if ($value['from'] != 'support2@curtiscs.com') {
                    $ticket->update([
                        'cases_status' => 'handled',
                        'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
                        'is_reply' => 'true'
                    ]);
                }
            } else {
                $users = User::where([
                    ['role_id', '=', 5],
                    ['agent_type', '=', "Warranty"]
                ])->get();
                $userWithSmallestCount = null;
                $smallestCount = PHP_INT_MAX; // Initialize with the maximum integer value

                foreach ($users as $user) {
                    $count = DirectEmail::where('user_id', $user->id)->count();

                    if ($count < $smallestCount) {
                        $smallestCount = $count;
                        $userWithSmallestCount = $user;
                    }
                }
                $de = DirectEmail::where('threadId', '=', $value['threadId'])->first();
                if ($de) {
                    $de->update([
                        'isHide' => 'true'
                    ]);
                } else {
                    DirectEmail::create([
                        'email' => $value['from'],
                        'threadId' => $value['threadId'],
                        'user_id' => $userWithSmallestCount->id,
                        'count' => $value['count'] ?? 0,
                        'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
                    ]);
                }
            }
        }

        return response()->json(['message' => 'Emails processed successfully'], 200);
    }

    public function get_parts_unread_email(Request $request)
    {
       
        foreach ($request->all() as $value) {
            $ticket = Ticket::where('ticket_id', $value['ticket_id'])->first();
            if ($ticket) {
                if ($value['from'] != 'support2@curtiscs.com') {
                    $ticket->update([
                        'cases_status' => 'handled',
                        'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
                        'is_reply' => 'true'
                    ]);
                }
            } else {
                $users = User::where([
                    ['role_id', '=', 5],
                    ['agent_type', '=', "Parts"]
                ])->get();
                $userWithSmallestCount = null;
                $smallestCount = PHP_INT_MAX; // Initialize with the maximum integer value

                foreach ($users as $user) {
                    $count = DirectEmail::where('user_id', $user->id)->count();

                    if ($count < $smallestCount) {
                        $smallestCount = $count;
                        $userWithSmallestCount = $user;
                    }
                }
                $de = DirectEmail::where('threadId', '=', $value['threadId'])->first();
                if ($de) {
                    $de->update([
                        'isHide' => 'true'
                    ]);
                } else {
                    DirectEmail::create([
                        'email' => $value['from'],
                        'threadId' => $value['threadId'],
                        'user_id' => $userWithSmallestCount->id,
                        'count' => $value['count'] ?? 0,
                        'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
                    ]);
                }
            }
        }

        return response()->json(['message' => 'Emails processed successfully'], 200);
    }
}

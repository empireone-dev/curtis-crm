<?php

namespace App\Http\Controllers;

use App\Models\DirectEmail;
use App\Models\Ticket;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AppScriptController extends Controller
{
    public function find14CharSequences($sentence)
    {
        // Regular expression to match sequences that start with CF, PS, or TS and have 14 total characters
        $regex = '/\b(CF|PS|TS)\w{12}\b/';

        // Perform the match and return the results
        preg_match_all($regex, $sentence, $matches);

        // Return the matched sequences (if any)
        return $matches[0] ?? [];
    }

    public function get_warranty_unread_email(Request $request)
    {

        foreach ($request->all() as $value) {

            $ticket = Ticket::where('ticket_id', $this->find14CharSequences($value['ticket_id']))->first();
            if ($ticket) {
                if ($value['from'] != 'support2@curtiscs.com') {
                    $ticket->update([
                        'cases_status' => 'handled',
                        'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
                        'is_reply' => 'true'
                    ]);
                }
            }
            if ($value['ticket_id'] == 'direct_email') {
                $users = User::where([
                    ['role_id', '=', 5],
                    ['agent_type', '=', "Warranty"],
                    ['remember_token', '=', null],
                ])->get();
                $userWithSmallestCount = null;
                $smallestCount = PHP_INT_MAX; // Initialize with the maximum integer value

                foreach ($users as $user) {
                    $count = DirectEmail::where([
                        ['user_id', '=', $user->id],
                        ['isHide', '=', 'false'],
                    ])->count();

                    if ($count < $smallestCount) {
                        $smallestCount = $count;
                        $userWithSmallestCount = $user;
                    }
                }
                // $de = DirectEmail::where([
                //     ['threadId', '=', $value['threadId']],
                //     ['email', '=', $value['from']]
                // ])->first();
                // if ($de) {
                //     $de->update([
                //         'isHide' => 'false'
                //     ]);
                // } else {
                //     DirectEmail::create([
                //         'email' => $value['from'],
                //         'threadId' => $value['threadId'],
                //         'user_id' => $userWithSmallestCount->id??58,
                //         'count' => $value['count'] ?? 0,
                //         'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
                //     ]);
                // }

                $existing = DirectEmail::where('threadId', $value['threadId'])
                    ->where('email', $value['from'])
                    ->whereDate('email_date', Carbon::parse($value['date'])->toDateString())
                    ->first();

                if ($existing) {
                    $existing->update([
                        'isHide' => false // no quotes if it's boolean
                    ]);
                } else {
                    DirectEmail::create([
                        'email' => $value['from'],
                        'threadId' => $value['threadId'],
                        'user_id' => $userWithSmallestCount->id ?? 58,
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
            $ticket = Ticket::where('ticket_id', $this->find14CharSequences($value['ticket_id']))->first();
            if ($ticket) {
                if ($value['from'] != 'parts@curtiscs.com') {
                    $ticket->update([
                        'cases_status' => 'handled',
                        'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
                        'is_reply' => 'true'
                    ]);
                }
            }
            if ($value['ticket_id'] == 'direct_email') {
                $users = User::where([
                    ['role_id', '=', 5],
                    ['agent_type', '=', "Parts"],
                    ['remember_token', '=', null],
                ])->get();
                $userWithSmallestCount = null;
                $smallestCount = PHP_INT_MAX; // Initialize with the maximum integer value

                foreach ($users as $user) {
                    $count = DirectEmail::where([
                        ['user_id', '=', $user->id],
                        ['isHide', '=', 'false'],
                    ])->count();

                    if ($count < $smallestCount) {
                        $smallestCount = $count;
                        $userWithSmallestCount = $user;
                    }
                }
                $de = DirectEmail::where('threadId', '=', $value['threadId'])->first();
                if ($de) {
                    $de->update([
                        'isHide' => 'false'
                    ]);
                } else {
                    DirectEmail::create([
                        'email' => $value['from'],
                        'threadId' => $value['threadId'],
                        'user_id' => $userWithSmallestCount->id ?? 60,
                        'count' => $value['count'] ?? 0,
                        'email_date' => Carbon::parse($value['date'])->format('Y-m-d H:i:s'),
                    ]);
                }
            }
        }

        return response()->json(['message' => 'Emails processed successfully'], 200);
    }
}

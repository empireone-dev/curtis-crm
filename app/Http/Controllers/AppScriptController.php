<?php

namespace App\Http\Controllers;

use App\Models\DirectEmail;
use App\Models\Recall;
use App\Models\Ticket;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AppScriptController extends Controller
{

    public function find14CharSequences($sentence)
    {
        // Regular expression to match sequences that start with CF, PS, or TS and have 14 total characters
        $regex = '/\b(CF|PS|SI|TS)\w{12}\b/';

        // Perform the match and return the results
        preg_match_all($regex, $sentence, $matches);

        // Return the matched sequences (if any)
        return $matches[0] ?? [];
    }
    public function remove_unread_email(Request $request)
    {

        foreach ($request->ticket_ids as $key => $ticket_id) {
            $ticket = Ticket::where([
                ['ticket_id', '=', $ticket_id],
                ['is_reply', '=', 'true'],
                ['cases_status', '=', 'handled'],
            ])->first();
            if ($ticket) {
                $ticket->update([
                    'cases_status' => 'hidden',
                    'is_reply' => null
                ]);
            }
        }

        return 'success';
    }

    public function get_recall_unread_email(Request $request)
    {
        foreach ($request->all() as $value) {

            // $ticket = Ticket::where('ticket_id', $this->find14CharSequences($value['ticket_id']))->first();
            // if ($ticket) {
            //     if ($value['from'] != 'support2@curtiscs.com') {
            //         $ticket->update([
            //             'cases_status' => 'handled',
            //             'email_date' => Carbon::now()->addDays(1)->format('Y-m-d H:i:s'),
            //             'is_reply' => 'true'
            //         ]);
            //     }
            // }
            $existing = Recall::where('threadId', $value['threadId'])
                ->where('email', $value['from'])
                ->whereDate('email_date', Carbon::now()->format('Y-m-d H:i:s'))
                ->first();

            if ($existing) {
                $existing->update([
                    'isHide' => 'false' // no quotes if it's boolean
                ]);
            } else {
                Recall::create([
                    'email' => $value['from'],
                    'threadId' => $value['threadId'],
                    // 'user_id' => $userWithSmallestCount->id ?? 58,
                    'count' => $value['count'] ?? 0,
                    'email_date' => Carbon::now()->addDays(1)->format('Y-m-d H:i:s'),
                ]);
            }
            // if ($value['ticket_id'] == 'direct_email') {
            // $users = User::where([
            //     ['role_id', '=', 5],
            //     ['agent_type', '=', "Warranty"],
            //     ['remember_token', '=', null],
            // ])->get();
            // $userWithSmallestCount = null;
            // $smallestCount = PHP_INT_MAX; 

            // foreach ($users as $user) {
            //     $count = DirectEmail::where([
            //         ['user_id', '=', $user->id],
            //         ['isHide', '=', 'false'],
            //     ])->count();

            //     if ($count < $smallestCount) {
            //         $smallestCount = $count;
            //         $userWithSmallestCount = $user;
            //     }
            // }


            // }
        }
        return response()->json(['message' => 'Emails processed successfully'], 200);
    }
    public function get_warranty_unread_email(Request $request)
    {
        $tickets = [];
        $processedData = $request->all();

        // Cache or fetch the user with the smallest workload for today to avoid running N+1 queries in the loop
        $userWithSmallestCount = User::whereIn('agent_type', ['Warranty', 'Safety Issue'])
            ->whereNull('remember_token')
            ->withCount(['directEmails' => function ($query) {
                $query->where('isHide', 'false')
                    ->whereDate('created_at', Carbon::today());
            }])
            ->orderBy('direct_emails_count', 'asc')
            ->first();

        $fallbackUserId = $userWithSmallestCount ? $userWithSmallestCount->id : 58;
        $futureEmailDate = Carbon::now()->addDay()->toDateTimeString();

        foreach ($processedData as $value) {
            $ticketIdInput = $value['ticket_id'] ?? null;

            if ($ticketIdInput !== 'direct_email') {
                $ticketId = $this->find14CharSequences($ticketIdInput);
                $tickets[] = $ticketId;

                $ticket = Ticket::where('ticket_id', $ticketId)
                    ->whereNull('is_reply')
                    ->first();

                // Only update if ticket exists and email is not from the support exclusion list
                if ($ticket && ($value['from'] ?? null) !== 'support2@curtiscs.com') {
                    $ticket->update([
                        'cases_status' => 'handled',
                        'email_date'   => $futureEmailDate,
                        'is_reply'     => 'true',
                    ]);
                }
            } else {
                // Logic for 'direct_email'
                $existing = DirectEmail::where('threadId', $value['threadId'] ?? null)->first();

                if ($existing) {
                    $existing->update(['isHide' => 'false']);
                } else {
                    DirectEmail::create([
                        'email'      => $value['from'] ?? null,
                        'threadId'   => $value['threadId'] ?? null,
                        'user_id'    => $fallbackUserId,
                        'count'      => $value['count'] ?? 0,
                        'email_date' => $futureEmailDate,
                    ]);
                }
            }
        }

        return response()->json([
            'data'    => $tickets,
            'data2'   => $processedData,
            'message' => 'Emails processed successfully'
        ], 200);
    }
    public function get_parts_unread_email(Request $request)
    {

        $tickets = [];
        foreach ($request->all() as $value) {
            if ($value['ticket_id'] != 'direct_email') {
                $ticketId = $this->find14CharSequences($value['ticket_id']);

                $ticket = Ticket::where('ticket_id', $ticketId)
                    ->whereNull('is_reply')
                    ->first();
                $tickets[] = $ticketId;

                // Only update if ticket exists and from is not the support email
                if ($ticket && $value['from'] != 'parts@curtiscs.com') {
                    $ticket->update([
                        'cases_status' => 'handled',
                        'email_date' => Carbon::now()->addDays(1)->format('Y-m-d H:i:s'),
                        'is_reply' => 'true',
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
                    ])
                        ->whereDate('created_at', Carbon::today())
                        ->count();

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
                        'email_date' => Carbon::now()->addDays(1)->format('Y-m-d H:i:s'),
                    ]);
                }
            }
        }

        return response()->json(['message' => 'Emails processed successfully'], 200);
    }
}

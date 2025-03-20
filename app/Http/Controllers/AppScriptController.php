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
                    ['agent_type', '=', "Warranty"]
                ])->get();

                if ($users->isEmpty()) {
                    // Handle case where no eligible users are found
                    return;
                }

                // Get counts for all users in one query
                $userCounts = DirectEmail::selectRaw('user_id, COUNT(*) as total')
                    ->whereIn('user_id', $users->pluck('id'))
                    ->groupBy('user_id')
                    ->pluck('total', 'user_id');

                // Find user with the smallest count
                $userWithSmallestCount = $users->sortBy(fn($user) => $userCounts[$user->id] ?? 0)->first();

                $de = DirectEmail::where('threadId', '=', $value['threadId'])->first();

                if ($de) {
                    $de->update([
                        'isHide' => 'false'
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
                    ['agent_type', '=', "Parts"]
                ])->get();

                if ($users->isEmpty()) {
                    // Handle case where no eligible users are found
                    return;
                }

                // Get counts for all users in one query
                $userCounts = DirectEmail::selectRaw('user_id, COUNT(*) as total')
                    ->whereIn('user_id', $users->pluck('id'))
                    ->groupBy('user_id')
                    ->pluck('total', 'user_id');

                // Find user with the smallest count
                $userWithSmallestCount = $users->sortBy(fn($user) => $userCounts[$user->id] ?? 0)->first();

                $de = DirectEmail::where('threadId', '=', $value['threadId'])->first();

                if ($de) {
                    $de->update([
                        'isHide' => 'false'
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

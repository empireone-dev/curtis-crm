<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\User;
use Illuminate\Http\Request;

class ActivityController extends Controller
{

    public static function create_activity($user_id, $ticket_id, $message, $type)
    {
        $activity = Activity::where([['user_id', '=', $user_id], ['user_id', '=', $ticket_id], ['type', '=', 'upload']])->first();
        if (!$activity) {
            return Activity::create([
                'user_id' => $user_id,
                'ticket_id' => $ticket_id,
                'message' => $message,
                'type' => $type,
            ]);
        }
    }

    public function show($ticket_id)
    {
        $activities = Activity::where('ticket_id', $ticket_id)
            ->with(['user', 'ticket'])
            ->orderBy('id', 'desc')
            ->get();

        $newData = [];

        foreach ($activities as $key => $activity) {
            // Retrieve the ASC using the ASC ID from the ticket
            $asc = User::find($activity->ticket['asc_id']);

            // If ASC is found, merge it with activity data
            if ($asc) {
                $mergedData = array_merge($activity->toArray(), ['asc_data' => $asc->toArray()]);
            } else {
                // If ASC is not found, set asc data to null
                $mergedData = array_merge($activity->toArray(), ['asc_data' => null]);
            }

            // Append merged data to newData array
            $newData[] = $mergedData;
        }

        // Return the merged data
        return response()->json([
            'data' => $newData
        ], 200);
    }
}

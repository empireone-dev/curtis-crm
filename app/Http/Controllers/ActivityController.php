<?php

namespace App\Http\Controllers;

use App\Models\Activity;
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
        $activities = Activity::where('ticket_id', $ticket_id)->with('user')->get();
        return response()->json([
            'data' => $activities
        ], 200);
    }
}

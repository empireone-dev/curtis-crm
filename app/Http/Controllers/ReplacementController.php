<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Refund;
use App\Models\Replacement;
use App\Models\Ticket;
use Illuminate\Http\Request;

class ReplacementController extends Controller
{
    public function show($ticket_id)
    {
        $replacement = Replacement::where('ticket_id', $ticket_id)->first();
        return response()->json([
            'status' =>  $replacement
        ], 200);
    }

    public function store(Request $request)
    {
        $replacement = Replacement::where('ticket_id', $request->ticket_id)->first();
        $ticket = Ticket::where('id', $request->ticket_id)->first();

        $ticket->update([
            'status' => $request->status,
        ]);

        Activity::create([
            'user_id'=>$request->user_id,
            'ticket_id'=>$request->ticket_id,
            'type'=>'REPLACEMENT',
            'message'=>json_encode($request->all())
        ]);
        if ($replacement) {
            $replacement->update($request->all());
        } else {
            Replacement::create($request->all());
        }
        return response()->json([
            'status' => $ticket
        ], 200);
    }
}

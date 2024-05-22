<?php

namespace App\Http\Controllers;

use App\Mail\EmailTemplate;
use App\Models\Activity;
use App\Models\DecisionMaking;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class DecisionMakingController extends Controller
{
    public function store(Request $request)
    {
        $data = DecisionMaking::where('ticket_id', $request->id)->first();
        if ($data) {
            $data->update(array_merge($request->all(), ['ticket_id' => $request->id]));
        } else {
            $data = DecisionMaking::create(
                array_merge($request->all(), ['ticket_id' => $request->id])
            );
        }

        Activity::create([
            'user_id' => $request->user_id,
            'ticket_id' => $request->id,
            'type' => 'DECISION MAKING',
            'message' => json_encode(array_merge(
                $request->all(),
                [
                    'ticket_id' => $request->id,
                    'emp_id' => $request->emp_id,
                ]
            ))
        ]);

        $ticket = Ticket::where('id', $request->id)->first();
        $ticket->update([
            'asc_id' => $request->asc,
            'decision_making_id' => $data->id,
            'status' => ($request->instruction != 'Home' )? ($ticket->country . 'WAREHOUSE') : 'REFUND',
            'decision_status' => $request->ticket_type,
        ]);

        if ($request->template_text) {
            Mail::to($ticket->email)->send(new EmailTemplate($request->template_text, $ticket));
        }
        return  $data;
    }

    public function show($ticket_id)
    {
        $data = DecisionMaking::where('ticket_id', $ticket_id)->first();
        return response()->json([
            'status' => $data
        ], 200);
    }
}

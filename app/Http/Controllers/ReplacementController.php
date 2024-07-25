<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Refund;
use App\Models\Replacement;
use App\Models\Ticket;
use Illuminate\Http\Request;

class ReplacementController extends Controller
{

    public function parts_replacement_not_shipped(Request $request)
    {
        $ticket = Ticket::where('id', $request->ticket_id)->first();
        $ticket->update([
            'status' => $request->status
        ]);

        $ticketArray = $ticket instanceof Ticket ? $ticket->toArray() : [];

        Activity::create([
            'user_id' => $request->account['id'],
            'ticket_id' => $request->id,
            'type' => 'PARTS REPLACEMENT NOT SHIPPED',
            'message' => json_encode(array_merge($ticketArray, ['replacement' => $request->all()]))
        ]);

        return response()->json([
            'result' => $ticket
        ], 200);
    }
    public function parts_replacement_shipped(Request $request)
    {
        $replacement = Replacement::where('ticket_id', $request->ticket_id)->first();
        if ($replacement) {
            $replacement->update([
                'unit' => $request->unit,
                'ship_date' => $request->ship_date,
                'model' => $request->item_number,
                'brand' => $request->brand,
                'serial_number' => $request->serial_number,
                'tracking' => $request->tracking,
                'notes' => $request->notes,
            ]);
        } else {
            Replacement::create([
                'ticket_id' => $request->ticket_id,
                'unit' => $request->unit,
                'ship_date' => $request->ship_date,
                'model' => $request->item_number,
                'brand' => $request->brand,
                'serial_number' => $request->serial_number,
                'tracking' => $request->tracking,
                'notes' => $request->notes,
            ]);
        }
        $ticket = Ticket::where('id', $request->ticket_id)->first();
        $ticket->update([
            'status' => $request->status
        ]);
        $ticketArray = $ticket instanceof Ticket ? $ticket->toArray() : [];
        Activity::create([
            'user_id' => $request->account['id'],
            'ticket_id' => $request->ticket_id,
            'type' => 'PARTS REPLACEMENT SHIPPED',
            'message' => json_encode(array_merge($ticketArray, ['replacement' => $request->all()]))
        ]);

        return response()->json([
            'status' =>  $ticket
        ], 200);
    }
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

        if ($replacement) {
            $replacement->update($request->all());
        } else {
            Replacement::create($request->all());
        }
        $ticketArray = $ticket instanceof Ticket ? $ticket->toArray() : [];
        Activity::create([
            'user_id' => $request->account['id'],
            'ticket_id' => $request->ticket_id,
            'type' => 'REPLACEMENT SHIPPED',
            'message' => json_encode(array_merge($ticketArray, ['replacement' => $request->all()]))
        ]);
        return response()->json([
            'status' => $ticket
        ], 200);
    }
}

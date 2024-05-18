<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\DecisionMaking;
use App\Models\Repair;
use App\Models\Ticket;
use Illuminate\Http\Request;

class RepairController extends Controller
{


    public function unrepair(Request $request, $id)
    {
        $ticket = Ticket::where('id', '=', $id)->with(['decision_making', 'replacement', 'receipt', 'refund', 'repair'])->first();
        $ticket->update([
            'status' => 'RESOURCE',
            'decision_status' => $request->status
        ]);
        Activity::create([
            'user_id' => $request->account['id'],
            'ticket_id' => $request->ticket_id,
            'type' => 'NOT REPAIR',
            'message' => json_encode($ticket)
        ]);
        return response()->json([
            'status' =>$request->all()
        ], 200);
    }

    public function update(Request $request, $id)
    {

        $repair = Repair::where('ticket_id', '=', $request->ticket_id)->first();

        if ($repair) {
            $repair->update([
                'repair_cost' => $request->repair_cost,
                'notes' => $request->notes,
            ]);
        } else {
            Repair::create([
                'ticket_id' => $request->ticket_id,
                'repair_cost' => $request->repair_cost,
                'notes' => $request->notes,
                'asc' => $request->asc,
            ]);
        }
        $ticket = Ticket::where('id', $request->ticket_id)->with(['decision_making', 'replacement', 'receipt', 'refund', 'repair'])->first();
        $ticket->update([
            'status' => $request->status,
            'decision_status' => 'REPAIRED'
        ]);
        $dm = DecisionMaking::where('ticket_id', $request->ticket_id)->first();
        $dm->update([
            'repair_cost' => $request->repair_cost
        ]);

        Activity::create([
            'user_id' => $request->account['id'],
            'ticket_id' => $request->ticket_id,
            'type' => 'REPAIR',
            'message' => json_encode($ticket)
        ]);
        return response()->json([
            'status' => $ticket
        ], 200);
    }
}

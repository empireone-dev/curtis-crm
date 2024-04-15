<?php

namespace App\Http\Controllers;

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
        $isExist = Replacement::where('ticket_id', $request->id)->first();
        $ticket = Ticket::where('id',$request->id)->first();
        $ticket->update([
            'status'=>'WAREHOUSE'
        ]);
        if (!$isExist) {
            Replacement::create([
                'ticket_id' => $request->id,
                'unit_cost' => $request->unit_cost,
                'cubed_weight' => $request->cubed_weight,
                'length' => $request->length,
                'width' => $request->width,
                'height' => $request->height,
                'shipping_cost' => $request->shipping_cost,
                'estimated_cost' => $request->estimated_cost,
                'instruction' => $request->instruction,
                'notes' => $request->notes,
            ]);
            return response()->json([
                'status' => 'succcess'
            ], 200);
        } else {
            $isExist->update([
                'ticket_id' => $request->id,
                'unit_cost' => $request->unit_cost,
                'cubed_weight' => $request->cubed_weight,
                'length' => $request->length,
                'width' => $request->width,
                'height' => $request->height,
                'shipping_cost' => $request->shipping_cost,
                'estimated_cost' => $request->estimated_cost,
                'instruction' => $request->instruction,
                'notes' => $request->notes,
            ]);
            return response()->json([
                'status' => 'succcess'
            ], 200);
        }
    }
}

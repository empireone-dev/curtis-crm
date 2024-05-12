<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\DecisionMaking;
use App\Models\Receipt;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;

class ReceiptController extends Controller
{
    public function store(Request $request)
    {
        $receipt = Receipt::where('ticket_id', '=', $request->id)->first();
        $decision = DecisionMaking::where('ticket_id', '=', $request->id)->first();
        $user = User::where('id',$request->user_id)->first();
        
        if ($receipt) {
            Activity::create([
                'user_id'=>$request->user_id,
                'ticket_id'=>$request->id,
                'type'=>'WARRANTY VALIDATION',
                'message'=>json_encode([
                    'emp_id'=>$request->emp_id,
                    'user_id' => $request->user_id,
                    'store' => $request->store,
                    'retailers_price' => $request->retailers_price,
                    'discount' => $request->discount,
                    'total_price' => $request->retailers_price - $request->discount,
                    'refurbished' => $request->refurbished,
                    'notes' => $request->notes,
                ])
            ]);
            $receipt->update([
                'user_id' => $request->user_id,
                'store' => $request->store,
                'retailers_price' => $request->retailers_price,
                'discount' => $request->discount,
                'total_price' => $request->retailers_price - $request->discount,
                'refurbished' => $request->refurbished,
                'notes' => $request->notes,
            ]);
        } else {
            Activity::create([
                'user_id'=>$request->user_id,
                'ticket_id'=>$request->id,
                'type'=>'WARRANTY VALIDATION',
                'message'=>json_encode([
                    'emp_id'=>$request->emp_id,
                    'user_id' => $request->user_id,
                    'ticket_id' => $request->id,
                    'store' => $request->store,
                    'retailers_price' => $request->retailers_price,
                    'discount' => $request->discount,
                    'total_price' => $request->retailers_price - $request->discount,
                    'refurbished' => $request->refurbished,
                    'notes' => $request->notes,
                ])
            ]);
            Receipt::create([
                'user_id' => $request->user_id,
                'ticket_id' => $request->id,
                'store' => $request->store,
                'retailers_price' => $request->retailers_price,
                'discount' => $request->discount,
                'total_price' => $request->retailers_price - $request->discount,
                'refurbished' => $request->refurbished,
                'notes' => $request->notes,
            ]);
        }
        if ($decision) {
            $decision->update([
                'retailers_price' => $request->retailers_price,
                'discount' => $request->discount,
                'after_discount' => $request->retailers_price - $request->discount,
            ]);
        } else {
            DecisionMaking::create([
                'ticket_id' => $request->id,
                'retailers_price' => $request->retailers_price,
                'discount' => $request->discount,
                'after_discount' => $request->retailers_price - $request->discount,
            ]);
        }

        $ticket = Ticket::where('id', $request->id)->first();
        $ticket->update([
            'status' => 'RESOURCE'
        ]);
        return response()->json([
            'status' => $ticket
        ], 200);
    }

    public function show($ticket_id)
    {
        $receipt = Receipt::where('ticket_id', $ticket_id)->first();
        return response()->json([
            'status' => $receipt
        ], 200);
    }
}

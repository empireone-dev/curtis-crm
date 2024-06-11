<?php

namespace App\Http\Controllers;

use App\Mail\EmailTemplate;
use App\Mail\Validation;
use App\Models\Activity;
use App\Models\DecisionMaking;
use App\Models\Receipt;
use App\Models\Refund;
use App\Models\Replacement;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class RefundController extends Controller
{
    public function warranty_checkque_shipped(Request $request)
    {
        $ticket = Ticket::where('id', $request->ticket_id)->first();
        $ticket->update([
            'status' => $request->status
        ]);
        $decision = DecisionMaking::where('ticket_id', $request->ticket_id)->first();
        $refund = Refund::where('ticket_id', $request->ticket_id)->first();
        if ($refund) {
            $refund->update([
                'retailers_price' => $request->retailers_price,
                'discount' => $request->discount,
                'after_discount' => $request->after_discount,
                'cheque_no' => $request->cheque_no,
                'cheque_amount' => $request->cheque_amount,
                'cost_refund' => $request->cost_refund,
                'notes' => $request->notes,
                'ship_date' => $request->ship_date,
            ]);
        } else {
            Refund::create([
                'ticket_id' => $request->ticket_id,
                'retailers_price' => $request->retailers_price,
                'discount' => $request->discount,
                'after_discount' => $request->after_discount,
                'cheque_no' => $request->cheque_no,
                'cheque_amount' => $request->cheque_amount,
                'cost_refund' => $request->cost_refund,
                'notes' => $request->notes,
                'ship_date' => $request->ship_date,
            ]);
        }
        if ($decision) {
            $decision->update([
                'retailers_price' => $request->retailers_price,
                'discount' => $request->discount,
                'after_discount' => $request->after_discount,
                'cheque_no' => $request->cheque_no,
                'cheque_amount' => $request->cheque_amount,
                'cost_refund' => $request->cost_refund,
            ]);
        } else {
            DecisionMaking::create([
                'ticket_id' => $request->ticket_id,
                'retailers_price' => $request->retailers_price,
                'discount' => $request->discount,
                'after_discount' => $request->after_discount,
                'cheque_no' => $request->cheque_no,
                'cheque_amount' => $request->cheque_amount,
                'cost_refund' => $request->cost_refund,
            ]);
        }
        $ticketArray = $ticket instanceof Ticket ? $ticket->toArray() : [];
        Activity::create([
            'user_id' => $request->account['id'],
            'ticket_id' => $request->ticket_id,
            'type' =>'REFUND SHIPPED',
            'message' => json_encode(array_merge($ticketArray, ['refund' => $request->all()]))
        ]);

        return response()->json([
            'status' => $ticket,
        ], 200);
    }
    public function store(Request $request)
    {

        $refund = Refund::where('ticket_id', $request->ticket_id)->first();
        $isReplacementExist = Replacement::where('ticket_id', $request->ticket_id)->first();

        if ($isReplacementExist) {
            $isReplacementExist->update([
                'ticket_id' => $request->ticket_id,
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
        } else {
            Replacement::create([
                'ticket_id' => $request->ticket_id,
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
        }

        if ($refund) {
            $refund->update([
                'cheque_no' => $request->cheque_no,
                'cheque_amount' => $request->cheque_amount,
                'mail_date' => $request->mail_date,
                'unit_cost' => $request->unit_cost,
                'cubed_weight' => $request->cubed_weight,
                'length' => $request->length,
                'width' => $request->width,
                'height' => $request->height,
                'shipping_cost' => $request->shipping_cost,
                'estimated_cost' => $request->estimated_cost,
                'notes' => $request->notes,
            ]);
        } else {
            Refund::create([
                'ticket_id' => $request->ticket_id,
                'cheque_no' => $request->cheque_no,
                'cheque_amount' => $request->cheque_amount,
                'mail_date' => $request->mail_date,
                'unit_cost' => $request->unit_cost,
                'cubed_weight' => $request->cubed_weight,
                'length' => $request->length,
                'width' => $request->width,
                'height' => $request->height,
                'shipping_cost' => $request->shipping_cost,
                'estimated_cost' => $request->estimated_cost,
                'notes' => $request->notes,
            ]);
        }

        $ticket = Ticket::where('id', $request->id)->with(['refund', 'receipt'])->first();
        $status = $request->instruction == 'US Warehouse' || $request->instruction == 'CA Warehouse' ? 'WAREHOUSE' : 'REFUND';
        $ticket->update([
            'status' => $status,
            'decision_status' => $request->decision_status
        ]);
        ActivityController::create_activity(
            $request->account['id'],
            $request->id,
            strtoupper($request->account['name']) . ' MOVE TO ' . $request->instruction,
            $request->instruction
        );
        if ($request->template_text) {
            Mail::to($ticket->email)->send(new EmailTemplate($request->template_text, $ticket));
        }
        return response()->json([
            'status' => $ticket
        ], 200);
    }
}

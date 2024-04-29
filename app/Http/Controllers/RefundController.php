<?php

namespace App\Http\Controllers;

use App\Mail\EmailTemplate;
use App\Mail\Validation;
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
        $refund = Refund::where('ticket_id', $request->ticket_id)->first();
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
        $replacement = Replacement::where('ticket_id', $request->ticket_id)->first();
        if ($replacement) {
            $replacement->update([
                'unit' => $request->unit,
                'brand' => $request->brand,
                'item_number' => $request->item_number,
                'serial_number' => $request->serial_number,
                'tracking' => $request->tracking,
                'notes' => $request->notes,
            ]);
        }else{
            Replacement::create([
                'ticket_id'=> $request->ticket_id,
                'unit' => $request->unit,
                'brand' => $request->brand,
                'item_number' => $request->item_number,
                'serial_number' => $request->serial_number,
                'tracking' => $request->tracking,
                'notes' => $request->notes,
            ]);
        }
     

        $ticket = Ticket::where('id', $request->ticket_id)->first();
        $ticket->update([
            'status' => $request->status
        ]);
        Receipt::where('ticket_id', $request->ticket_id)
            ->update([
                'retailers_price' => $request->retailers_price,
                'discount' => $request->discount,
                'total_price' => $request->total_price,
                'notes' => $request->notes,
            ]);

        ActivityController::create_activity(
            $request->account['id'],
            $request->id,
            strtoupper($request->account['name']) . ' MOVE TO ' . $request->status,
            $request->status
        );

        return response()->json([
            'status' => $ticket
        ], 200);
    }
    public function store(Request $request)
    {

        $refund = Refund::where('ticket_id', $request->ticket_id)->first();
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
            'status' => $status
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

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
use Illuminate\Support\Facades\Validator;
use League\Csv\Reader;
use League\Csv\Statement;

class RefundController extends Controller
{
    public function upload_csv_file(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt'
        ]);

        $file = $request->file('csv_file'); // Retrieve the uploaded file

        // Parse CSV data without setting header offset
        $csv = Reader::createFromPath($file->getPathname(), 'r');

        $records = $csv->getRecords(); // Get all CSV rows as iterator

        $csvData = [];
        $firstRowSkipped = false;


        if ($request->type == 'REPLACEMENT') {
            foreach ($records as $record) {
                if (!$firstRowSkipped) {
                    $firstRowSkipped = true;
                    continue;
                }
                if (empty(array_filter($record))) {
                    continue;
                }
                if ($record[0] !== '' && $record[1] !== '' && $record[2] !== '' && $record[3] !== '' && $record[4] !== '') {
                    $ticket = Ticket::where('ticket_id', $record[2])->first();
                    if ($ticket) {
                        $replacement = Replacement::where('ticket_id', $ticket->id)->first();
                        // $dm = DecisionMaking::where('ticket_id', $ticket->id)->first();

                        // if ($dm) {
                        //     $dm->update([
                        //         'tracking' => $record[1],
                        //         'item_number' => $record[3],
                        //         'serial_number' => $record[4],
                        //     ]);
                        // } else {
                        //     DecisionMaking::create([
                        //         'ticket_id' => $ticket->id,
                        //         'tracking' => $record[1],
                        //         'item_number' => $record[3],
                        //         'serial_number' => $record[4],
                        //     ]);
                        // }
                        if ($replacement) {
                            $replacement->update([
                                'ship_date' => $record[0],
                                'tracking' => $record[1],
                                'item_number' => $record[3],
                                'serial_number' => $record[4],
                            ]);
                        } else {
                            Replacement::create([
                                'ticket_id' => $ticket->id,
                                'ship_date' => $record[0],
                                'tracking' => $record[1],
                                'item_number' => $record[3],
                                'serial_number' => $record[4],
                            ]);
                        }
                    }
                    $ticket->update([
                        'status'=>'PROCESSED TICKET'
                    ]);
                    $csvData[] = $record;
                }
            }
        } else if ($request->type == 'REFUND') {

            foreach ($records as $record) {
                if (!$firstRowSkipped) {
                    $firstRowSkipped = true;
                    continue;
                }
                if (empty(array_filter($record))) {
                    continue;
                }
                //Case File
                //Date Issued
                //Cheque #
                //Amount of Refund:
                if ($record[0] !== '' && $record[1] !== '' && $record[2] !== '' && $record[3] !== '') {
                    $ticket = Ticket::where('ticket_id', $record[0])->first();
                    if ($ticket) {
                        $refund = Refund::where('ticket_id', $ticket->id)->first();
                        $dm = DecisionMaking::where('ticket_id', $ticket->id)->first();

                        if ($dm) {
                            $dm->update([
                                'date' => $record[1],
                                'cheque_no' => $record[2],
                                'cheque_amount' =>str_replace('$', '', $record[3]),
                            ]);
                        } else {
                            DecisionMaking::create([
                                'ticket_id' => $ticket->id,
                                'date' => $record[1],
                                'cheque_no' => $record[2],
                                'cheque_amount' =>str_replace('$', '', $record[3]),
                            ]);
                        }
                        if ($refund) {
                            $refund->update([
                                'ship_date' => $record[1],
                                'cheque_no' => $record[2],
                                'cheque_amount' =>str_replace('$', '', $record[3]),
                            ]);
                        } else {
                            Refund::create([
                                'ticket_id' => $ticket->id,
                                'ship_date' => $record[1],
                                'cheque_no' => $record[2],
                                'cheque_amount' =>str_replace('$', '', $record[3]),
                            ]);
                        }
                    }
                    $ticket->update([
                        'status'=>'PROCESSED TICKET'
                    ]);
                    $csvData[] = $record;
                }
            }
        }


        return response()->json([
            'data' => $csvData
        ]);
    }



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
            'type' => 'REFUND SHIPPED',
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

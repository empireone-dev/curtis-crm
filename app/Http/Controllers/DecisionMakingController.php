<?php

namespace App\Http\Controllers;

use App\Mail\EmailTemplate;
use App\Models\Activity;
use App\Models\DecisionMaking;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use GuzzleHttp\Client;

class DecisionMakingController extends Controller
{
    public function send_warranty_email($recipient, $subject, $body)
    {
        $scriptUrl = 'https://script.google.com/macros/s/AKfycbx6QS2voE5bDVKn0QRSzqdVlRU9mwubNYRyW0LHzY74PCDCn9szOpapoPzgM06GPqc/exec';

        $params = [
            'recipient' => $recipient,
            'subject' => $subject,
            'body' => $body
        ];
        $client = new Client();
        $response = $client->post($scriptUrl, [
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded'
            ],
            'form_params' => $params
        ]);
        $body = $response->getBody()->getContents();
        return $body;
    }



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

        $instruction = '';
        if (
            $request->instruction == "CA Warehouse" ||
            $request->instruction == "US Warehouse"
        ) {
            $instruction = $ticket->country . ' WAREHOUSE';
        } else if ($request->instruction == "ASC") {
            $instruction = 'REPAIR';
        } else if ($request->instruction == "Home") {
            $instruction = 'WAITING FOR PHOTOS';
        } else if ($request->instruction == "RMA Request") {
            $instruction = 'RMA REQUEST';
        }
        // else {
        //     $instruction = 'REFUND';
        // }
        $ticket->update([
            'asc_id' => $request->asc,
            'decision_making_id' => $data->id,
            'status' => $instruction,
            'decision_status' => $request->ticket_type,
        ]);

        if ($request->template_text) {
            $this->send_warranty_email($ticket->email, $ticket->ticket_id, $request->template_text);
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

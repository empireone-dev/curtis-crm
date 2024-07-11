<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\EmailTemplate;
use App\Mail\MailCreateTicketForm;
use App\Mail\Validation;
use App\Models\Activity;
use App\Models\EmailTemplate as ModelsEmailTemplate;
use App\Models\Ticket;
use Illuminate\Support\Facades\Mail;
use GuzzleHttp\Client;

class EmailTemplateController extends Controller
{
    public function send_parts_email($recipient, $subject, $body)
    {
        $scriptUrl = 'https://script.google.com/macros/s/AKfycbx9LsPiFQTvydnoCEmDPAMUTyQSEmdOHYxrSS507QZbiIAYrNWOLTogRWAUcX8BTx3x/exec';
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
        $email_template = ModelsEmailTemplate::create([
           'template_name'=>$request->template_name,
           'template_text'=>$request->template_text,
        ]);
    
        return response()->json([
            'status' => 'success',
            'data' => $email_template
        ], 200);
    }
    public function show($id)
    {
        $email_template = ModelsEmailTemplate::find($id);
    
        return response()->json([
            'status' => 'success',
            'data' => $email_template
        ], 200);
    }
    public function index()
    {
        $email_template = ModelsEmailTemplate::get();
        return response()->json([
            'data' => $email_template
        ], 200);
    }

    public function destroy($id)
    {
        $email_template = ModelsEmailTemplate::find($id);
        if (!$email_template) {
            return response()->json([
                'status' => 'error',
                'message' => 'email_template not found'
            ], 404);
        }

        $email_template->delete();

        $email_templates = ModelsEmailTemplate::get();
        return response()->json([
            'status' => 'success',
            'data' => $email_templates
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $email_template = ModelsEmailTemplate::where('id',$id)->first();
        $email_template->update($request->all());

        return response()->json([
            'data' => $email_template
        ], 200);
    }

    public function send_mail_create_ticket_form($data)
    {
        if ($data['email'] && $data['isSendEmail']) {
            Mail::to($data['email'])->send(new MailCreateTicketForm($data));
        }
        return response()->json([
            'status' => 'success',
        ], 200);
    }
    public function sendNotification()
    {
        $details ='<b><i>Marlou Pepito</i></b>';

       $mail= Mail::to('eogs.marlou@gmail.com')->send(new Validation($details));

        return response()->json([
            'status' => $mail,
        ], 200);
    }

    public function validation(Request $request)
    {

        $status = '';
        if ($request->mark == 'IW') {
            $status = 'INTERNALS';
        } else if ($request->mark == 'OOW') {
            $status = 'INTERNALS';
        }else if ($request->mark == 'INCOMPLETE') {
            $status = null;
        }  else {
            $status = 'CLOSED';
        }
      
        Ticket::where('id', $request->ticket['id'])->first()
        ->update([
            'status' => $status,
            'warranty_status' => $request->mark,
            'validation_notes' => $request->validation_notes
        ]);
        $ticket = Ticket::where('id', $request->ticket['id'])->first();
        Activity::create([
            'user_id' => $request->user['id'],
            'ticket_id' => $request->ticket['id'],
            'type' => 'PARTS VALIDATION',
            'message' => json_encode($ticket)
        ]);
        // Mail::to($request->ticket['email'])->send(new Validation($request->template_text));
        $this->send_parts_email($ticket->email, $ticket->ticket_id, $request->template_text);
        return 'Email sent successfully!';
    }


    public function availability(Request $request)
    {

        $status = $request->status;
        $ticket = Ticket::where('id', $request->ticket['id'])->first();
        $ticket->update([
            'status' =>  $status,
            'availability_notes' => $request->availability_notes
        ]);


        Activity::create([
            'user_id' => $request->user['id'],
            'ticket_id' => $request->ticket['id'],
            'type' => 'AVAILABILITY',
            'message' => json_encode($request->all())
        ]);

        // Mail::to($request->ticket['email'])->send(new Validation($request->template_text));
        $this->send_parts_email($request->ticket['email'], $ticket->ticket_id, $request->template_text);
        return response()->json([
            'status' => $ticket,
        ], 200);
    }

    public function callback(Request $request)
    {

        $status = $request->status;
        $ticket = Ticket::where('id', $request->ticket['id'])->first();
        $ticket->update([
            'status' =>  $status,
            'callback_notes' => $request->callback_notes
        ]);

        ActivityController::create_activity(
            $request->user['id'],
            $request->ticket['id'],
            strtoupper($request->user['name']) . ' MOVE TO ' .  $status,
            'CALLBACK'
        );
        // Mail::to($request->ticket['email'])->send(new Validation($request->template_text));
        return response()->json([
            'status' => $ticket,
        ], 200);
    }
}

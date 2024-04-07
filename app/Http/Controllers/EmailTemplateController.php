<?php

namespace App\Http\Controllers;

use App\Mail\EmailTemplate;
use App\Mail\MailCreateTicketForm;
use App\Models\EmailTemplate as ModelsEmailTemplate;
use Illuminate\Support\Facades\Mail;

class EmailTemplateController extends Controller
{
    public function index(){
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

    public function send_mail_create_ticket_form($data)
    {
        if ($data['email'] && $data['isSendEmail']) {
            Mail::to('recipient@example.com')->send(new MailCreateTicketForm($data));
        }
        return response()->json([
            'status' => 'success',
        ], 200);
    }
    public function sendNotification()
    {
        $details = [
            'name' => '<b><i>Marlou Pepito</i></b>',
            'title' => '<b>Mail from Laravel</b>',
            'body' => '<b>This is a test email from Laravel using SMTP.</b>'
        ];

        Mail::to('recipient@example.com')->send(new EmailTemplate($details));

        return 'Email sent successfully!';
    }
    
}

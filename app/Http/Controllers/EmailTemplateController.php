<?php

namespace App\Http\Controllers;

use App\Mail\EmailTemplate;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class EmailTemplateController extends Controller
{
    
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

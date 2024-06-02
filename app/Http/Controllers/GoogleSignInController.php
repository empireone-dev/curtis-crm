<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use App\Services\EmailService;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Services\GmailService;
use Webklex\IMAP\Facades\Client;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Http;

class GoogleSignInController extends Controller
{
    protected $gmailService;
    protected $emailService;
    protected $client;

    // public function __construct(GmailService $gmailService)
    // {
    //     $this->gmailService = $gmailService;
    // }

    // public function fetchEmails()
    // {
    //     $inbox = $this->gmailService->getInbox();
    //     // Process $inbox data as needed
    //     return $inbox;
    // }
    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    public function sendEmail(Request $request)
    {
        $recipient = 'eogs.marlou@gmail.com'; // Replace with the recipient's email address
        $subject = 'The The Item';
        $body = '<b>Your HTML body content</b>';

        $scriptUrl = 'https://script.google.com/macros/s/AKfycbzqsNb6x7pLbvl5xHWuW43PfF0yisgF0pY44Y5y53KmCg33rjraMzkk-coD2Fr9QKSF/exec';

        $response = Http::get($scriptUrl, [
            'recipient' => $recipient,
            'subject' => $subject,
            'body' => $body,
        ]);
        dd($response);
        return $response->body();
    }

    public function fetch_emails()
    {
        // Define the URL with parameters
        $numEmails = 100;
        $searchSubject = 'CF240524070120';
        $scriptUrl = 'https://script.google.com/macros/s/AKfycbwFfvYRTxJBfXlbmH0CnTytNxdgFWH209XIg8VfSHqYl-gdZqOgqwnf-ppM2F41zTPY/exec?numEmails=' . $numEmails . '&search=' . $searchSubject;

        // Make a GET request to the Google Apps Script Web App
        $response = Http::get($scriptUrl);

        // Check if the request was successful
        if ($response->successful()) {
            // Get the emails from the response
            $emails = $response->json();
            return response()->json([
                'emails' => $emails
            ], 200);
        } else {
            // Handle the error
            return response()->json(['error' => 'Failed to fetch emails'], 500);
        }
    }

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->user();
        $user = User::where('email', $googleUser->email)->first();
        if ($user) {
            Auth::login($user);
            if ($user->role_id == 1) {
                return redirect(RouteServiceProvider::ADMIN);
            } else if ($user->role_id == 2) {
                return redirect(RouteServiceProvider::CUSTOMER);
            }
        } else {
            return redirect(RouteServiceProvider::LOGININVALID);
        }
    }
}

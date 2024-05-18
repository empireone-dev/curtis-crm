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

    public function fetchEmails()
    {
        $emails = $this->emailService->fetchEmails();
        return response()->json($emails);
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

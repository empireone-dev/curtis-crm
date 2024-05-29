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

    public function fetchEmails(Request $request)
    {
        ini_set('memory_limit', '512M'); // Increase memory limit to 512 MB
        set_time_limit(100); // Increase the execution time to 100 seconds

        $client = Client::account('default');
        $client->connect();

        // Get the inbox folder
        $folder = $client->getFolder('INBOX');

        // Get the latest message in the inbox
        $latestMessage = $folder->messages()->all()->limit(1)->fetchOrder('desc')->get()->first();

       
        if ($latestMessage) {
            $emailDetails = [
                'subject' => $latestMessage->getSubject(),
                'from' => $latestMessage->getFrom()[0]->mail,
                'date' => $latestMessage->getDate()[0]->format('Y-m-d H:i:s'), // Correctly format the date
                'body' => $latestMessage->getHTMLBody(),
            ];

            return response()->json([
                'status' => 'success',
                'email' => $emailDetails
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'No emails found'
            ], 404);
        }
    }

    private function paginate(Collection $items, $perPage, $page, $options = [])
    {
        $page = $page ?: (LengthAwarePaginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        $paginatedItems = $items->forPage($page, $perPage);
        return new LengthAwarePaginator($paginatedItems, $items->count(), $perPage, $page, $options);
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

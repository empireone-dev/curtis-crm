<?php

namespace App\Http\Controllers;

use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GoogleSignInController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }
    
    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->user();
        
        // Check if the user already exists in your database
        $user = User::where('email', $googleUser->getEmail())->first();
        
        if (!$user) {
            // If the user does not exist, create a new user
            $user = new User();
            $user->name = $googleUser->getName();
            $user->email = $googleUser->getEmail();
            // Add any other user details you want to save
            $user->save();
        }
        
        // Log the user in
        Auth::login($user);
        
        // Redirect the user after login
        return redirect('/administrator/dashboard');
    }
}

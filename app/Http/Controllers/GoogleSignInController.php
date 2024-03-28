<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class GoogleSignInController extends Controller
{
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

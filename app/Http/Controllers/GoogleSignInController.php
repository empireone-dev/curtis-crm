<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
        $user = User::where('email', $googleUser->email)->first();
        if (!$user) {
            $user = User::create([
                'name' => $googleUser->name,
                'role_id'=>2,
                'email' => $googleUser->email,
                'password' => Hash::make(
                    rand(100000, 999999),
                )
            ]);
        }

        Auth::login($user);
        if ($user->role_id == 1) {
            return redirect(RouteServiceProvider::HOME);
        }else if($user->role_id == 2){
            return redirect(RouteServiceProvider::CLIENT);
        }
       
    }
}

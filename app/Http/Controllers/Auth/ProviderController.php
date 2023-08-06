<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Redirect;
class ProviderController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        try {
            $githubUser = Socialite::driver($provider)->user();
            $user = User::where([
                'provider_id' => $githubUser->id,
                'provider' => $provider
            ])->first();
            $password = Str::random(12);
            if(!$user){
                if(User::where('email',$githubUser->getEmail())->exists()){
                    return redirect::to('/login')->withErrors(['email'=>'This email has a different user']);
                }
                $user = User::create([
                    'name' => $githubUser->getName(),
                    'email' => $githubUser->getEmail(),
                    'username' => User::generateUserName($githubUser->getNickname()),
                    'provider' => $provider,
                    'provider_id' => $githubUser->getId(),
                    'provider_token' => $githubUser->token,
                    'password' => $password,
                ]);
                $user->sendEmailVerificationNotification();
                $user->update([
                    'password' => Hash::make($password)
                ]);
            }
            Auth::login($user);
     
            return redirect('/dashboard');
        } catch (Exception $e) {
            return $e;
        }    

    }
}

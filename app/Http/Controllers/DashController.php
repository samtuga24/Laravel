<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function show($user)
    {
        $auth_profile = User::with(['profile.followers','following','comments','posts.unlike','like'])
                        ->where('id', '=', $user)
                        ->get();
        return $auth_profile;
    }
}

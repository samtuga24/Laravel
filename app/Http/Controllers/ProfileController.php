<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Post;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index()
    {
        $user = Profile::where('user_id',request()->user()->id)->get();
        return $user;
    }
    public function search($name)
    {
        $search = Profile::with('user')->where('username','like', '%'. $name. '%')->paginate(20);
        return(['search'=>$search]);
    }
     public function show(User $user): Response
     {
        // $userposts = Post::with(['user','unlike','comments'])->where('user_id', '=', $user->id)->latest()->get();
        $profile = Profile::with(['user.posts','user.following','followers','user.unlike'])->where('user_id', '=', $user->id)->get();
        $follows = (auth()->user()) ? auth()->user()->following->contains($user) : false;

        return Inertia::render('UserPage',[
            "profile"=>$profile,
            "follows"=>$follows,
        ]);
     }
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function profileupdate(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function update(User $user): RedirectResponse
    {
        $this->authorize('update',$user->profile);
        $data = request()->validate([
            "header"=>["image","nullable"],
            "image"=>["image","nullable"],
            "bio"=>"nullable",
            "location"=>"nullable",
            "name"=>"required",
            "website"=>["nullable","url"],

        ]);
        $imagePath = request('image')->store('profile','public');
        if(request('header')){
            $headerPath = request('header')->store('header','public');
            $headerArray = ["header" => $headerPath];
        }
        $imagePath = request('image')->store('profile','public');
        if(request('image')){
            $imagePath = request('image')->store('profile','public');
            $imageArray = ["image" => $imagePath];
        }
        auth()->user()->profile()->update(array_merge(
            $data,
            ["image" => $imagePath],
            ["header" => $headerPath]
        ));
        return Redirect::to("/profile/{$user->id}");
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}

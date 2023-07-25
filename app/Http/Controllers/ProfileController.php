<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
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
    
    public function followers(User $user)
    {
        return Inertia::render('FollowersPage',[
            'user'=>$user,   
            'following'=>$user->following,
            'followers'=>$user->profile->followers
        ]);
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

        $profile = Profile::with(['user.following','followers','user.posts.unlike','user.posts.comments','user.comments','user.like'])->where('user_id', '=', $user->id)->get();
        $auth_following = auth()->user()->following()->get();
        return Inertia::render('UserPage',[
            "profile"=>$profile,
            "auth_following"=>$auth_following,
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

    public function update(User $user)
    {
        $this->authorize('update',$user->profile);
        $data = request()->validate([
            'header'=>'nullable|image',
            'image'=>'nullable|image',
            'bio'=>'',
            'location'=>'',
            'name'=>"required",
            'website'=>'nullable|url',

        ]);
        $headerArray = [];
        $imageArray = [];
        if(request('header')){
            $headerPath = request('header')->store('header','public');
            $headerArray = ["header" => $headerPath];
        }
        if(request('image')){
            $imagePath = request('image')->store('profile','public');
            $imageArray = ["image" => $imagePath];
        }
        $sent = auth()->user()->profile()->update(array_merge(
            $data,
            $headerArray,
            $imageArray
        ));
        return $sent;
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

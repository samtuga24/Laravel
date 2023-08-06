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

    public function show_users()
    {
        $user = new Profile();
        return $user->limit(3)->get();

    }
    
    public function followers(User $user)
    {
         $profileIds = $user->profile->followers->pluck('id');
         $followers = User::with('profile')->whereIn('id',$profileIds)->latest()->get();
        
        return Inertia::render('FollowersPage',[
            'user'=>$user,   
            'following'=>$user->following,
            'followers'=>$followers,
        ]);
    }
    public function index()
    {
        $user = Profile::with('user.following','followers')->where('user_id',request()->user()->id)->get();
        return $user;
    }
    public function search($name)
    {
        $search = Profile::with('user')
                    ->where('username','like', '%'. $name. '%')
                    ->orWhere('name','like','%'.$name.'%')
                    ->paginate(20);
        return $search;
    }
     public function show(User $user): Response
     {

        $profile = Profile::with(['user.following','followers','user.posts.unlike','user.posts.comments','user.comments','user.like.user.profile'])->where('user_id', '=', $user->id)->get();
        $auth_following = auth()->user()->following()->get();
        return Inertia::render('UserPage',[
            "profile"=>$profile,
            "auth_following"=>$auth_following,
        ]);
     }

     public function showfollowing(User $user)
     {

        $profile = Profile::with(['user.following','followers'])->where('user_id', '=', $user->id)->get();
        $auth_following = auth()->user()->following()->get();
        return ["profile"=>$profile,"following"=>$auth_following];
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
            'bio'=>'',
            'location'=>'',
            'name'=>"required",
            'website'=>'nullable|url',

        ]);
        if(request('image')){
            $data['image'] = request('image') ? request('image')->store('profile','public') : '';
        }
        if(request('header')){
            $data['header'] = request('header') ? request('header')->store('header','public') : '';
        }

        auth()->user()->profile()->update(
            $data,
        );
        return Redirect::back();
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

<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function show()
    {
        $followersId = auth()->user()->following()->pluck('profiles.user_id');
        $posts = Post::with(['user.profile','unlike','comments.replies'])
                    ->whereIn('user_id',$followersId)
                    ->latest()->get();
        return $posts;
    }
    public function store():RedirectResponse
    {
        $data = request()->validate([
            'content'=>"nullable",
            'image'=>"image|nullable",
        ]);

        $imagePath = request('image') ? request('image')->store('uploads','public') : ' ';
        $content = request('content') ? request('content') : ' ';

        auth()->user()->posts()->create([
            'content' => $content,
            'image'=> $imagePath,
        ]);
        return Redirect::to('/dashboard');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function show($id)
    {
        $post = Post::with(['user.profile','unlike', 'comments'])->where('id', '=', $id)->get();
        return Inertia::render('CommentView',['post'=>$post]);
    }

    public function store($id)
    {
        $data = request()->validate([
            'comment'=>'nullable',
            'image'=>"image|nullable",
        ]);
        $imagePath = request('image') ? request('image')->store('comments','public') : ' ';
        $comment = request('comment') ? request('comment') : ' ';
        Comment::create([
            'user_id'=>auth()->user()->id,
            'post_id'=>$id,
            'comment'=>$comment,
            'image'=>$imagePath,
        ]);
        return Redirect::to('/dashboard');
    }
}

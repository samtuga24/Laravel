<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function store(Post $post)
    {
        // dd(auth()->user()->unlike()->toggle($post));
        return auth()->user()->like()->toggle($post);
        // return $post;
    }

    public function store_comment_like(Comment $comment)
    {
        dd($comment);
        // return auth()->user()->comment_like()->toggle($comment);
    }
}

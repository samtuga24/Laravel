<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function store(Post $post)
    {
        return auth()->user()->unlike()->toggle($post);
        // return $post;
    }
}

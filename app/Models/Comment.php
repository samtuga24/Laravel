<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = [];
    use HasFactory;

    public function post()
    {
        return $this->belongsTo(Post::class)->orderBy('created_at', 'DESC');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function replies()
    {
        return $this->hasMany(Comment::class,'comment_id')->with('replies');
    }

    public function user_comment_like()
    {
        return $this->belongsToMany(User::class);
    }
}

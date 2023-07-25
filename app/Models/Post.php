<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = [];

    use HasFactory;


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function unlike()
    {
        return $this->belongsToMany(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->orderBy('created_at','DESC');
    }

}

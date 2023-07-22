<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use App\Repositories\ChatRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class MessageController extends Controller
{
    public function __construct(private ChatRepository $chat)
    {
        $this->chat = $chat;
    }
    public function index(User $user)
    {
        // dd($user);
        return Inertia::render('Chat',[
            "receiver_id"=>$user->id,
            "profile"=>$user->profile,
        ]);
    }

 

    public function store($id)
    {
        $data = request()->validate([
            'message'=> "required|string",
        ]);

        try {
            $message = $this->chat->sendMessage([
                'sender_id'=>request()->user()->id,
                'receiver_id'=>$id,
                'message'=> $data['message'],
            ]);
            event(new MessageSent($message));
            return $message;
        } catch (\Throwable $th) {
            return Redirect::to("messages/{$id}");
        }
    }


}

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
    public function unread()
    {
        $unreadMessage = Message::where('receiver_id', '=', auth()->user()->id)
            ->where('status', '=', 0)
            ->latest()
            ->get();
        return $unreadMessage;
    }

    // public function preview()
    // {

    // }
    public function index(User $user)
    {
        // dd($user);
        return Inertia::render('Chat',[
            "receiver_id"=>$user->id,
            "profile"=>$user->profile,
        ]);
    }
    public function show(Request $request){
        // dd($this->chat->getRecentMessage($request->user()->id));
        return [
            'recent_messages'=> $this->chat->getRecentMessage($request->user()->id),
        ];
    }
    public function store($id)
    {
        request()->validate([
            'message'=> "nullable",
            'image' => 'nullable|image'
        ]);

        try {
            $imagePath = request('image') ? request('image')->store('messages','public') : ' ';
            $content = request('message') ? request('message') : ' ';
            $message = $this->chat->sendMessage([
                'sender_id'=>request()->user()->id,
                'receiver_id'=>$id,
                'message'=> $content,
                'image' => $imagePath,
            ]);
            event(new MessageSent($message));
            return $message;
        } catch (\Throwable $th) {
            return Redirect::to("messages/{$id}");
        }
    }
    public function update()
    {
        $notify = Message::where('receiver_id', '=', auth()->user()->id);
        return $notify->update(['status'=>1]);
    }

    public function update_read(int $receiverId)
    {
        $message = Message::whereIn('sender_id', [request()->user()->id, $receiverId])
            ->whereIn('receiver_id', [request()->user()->id, $receiverId]);
        
        return $message->update(['read_status'=>1]);
    }

}

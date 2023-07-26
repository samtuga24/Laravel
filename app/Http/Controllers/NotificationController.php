<?php

namespace App\Http\Controllers;
use \App\Events\NotificationSent;
use App\Models\User;
use App\Repositories\NotificationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class NotificationController extends Controller
{
    public function __construct(private NotificationRepository $notification)
    {
        $this->notification=$notification;
    }

    public function show(User $user)
    {
        // return Inertia::render('Chat',[
        //     "receiver_id"=>$user->id,
        //     "profile"=>$user->profile,
        // ]);
    }

    public function store($id,$content)
    {
        try{
            $notification = $this->notification->sendNotification([
                'sender_id'=>request()->user()->id,
                'receiver_id'=>$id,
                'content'=> $content,
            ]);
            // dd($notification);
            event(new NotificationSent($notification));
            return $notification;
        }catch (\Throwable $th) {
            return Redirect::to("profile/{$id}");
        }
    }
}

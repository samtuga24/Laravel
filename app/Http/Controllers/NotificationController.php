<?php

namespace App\Http\Controllers;
use \App\Events\NotificationSent;
use App\Models\Notification;
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

    public function index()
    {
        $unreadNotification = Notification::where('receiver_id', '=', auth()->user()->id)
                            ->where('status', '=', 0)
                            ->latest()
                            ->get();
        return $unreadNotification;
    }

    public function show(User $user)
    {
        $notify = Notification::where('receiver_id', '=', $user->id)->latest()->get();
        $userId = $notify->pluck('sender_id');

        $sender = User::with('profile')->whereIn('id',$userId)->latest()->get();

        return ['sender'=>$sender,'notify'=>$notify];
    }

    public function store($id,$content)
    {
        
        try{
            $notification = $this->notification->sendNotification([
                'sender_id'=>request()->user()->id,
                'receiver_id'=>$id,
                'content'=> $content,
            ]);

            
            event(new NotificationSent($notification));
            return $notification;
        }catch (\Throwable $th) {
            return Redirect::to("profile/{$id}");
        }
    }

    public function update()
    {
        $notify = Notification::where('receiver_id', '=', auth()->user()->id);
        return $notify->update(['status'=>1]);
    }
}

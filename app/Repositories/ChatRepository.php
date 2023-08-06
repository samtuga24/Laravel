<?php
namespace App\Repositories;
use App\Models\Message;
use App\Models\Profile;
use Illuminate\Support\Facades\DB;

class ChatRepository
{
    
    public function show(int $senderId, int $receiverId)
    {
        return Message::whereIn('sender_id', [$senderId, $receiverId])
            ->whereIn('receiver_id', [$senderId, $receiverId])
            ->get();
    }
    // ->selectRaw('*, count(read_status) as recent_count')
    public function getRecentMessage(int $senderId)
    {
        DB::statement("SET SESSION sql_mode=''");
        $recentMessage = Message::where(function($query) use ($senderId){
            $query->where('sender_id',$senderId)
                ->orWhere('receiver_id',$senderId);
        })
        ->whereRaw('id IN (select MAX(id) FROM messages GROUP BY sender_id,receiver_id)')
          ->select('id','sender_id', 'receiver_id','read_status','message')
          ->orderBy('id','desc')
          ->limit(30)
          ->get();
        $recentUserWithMessages = [];
        $usedUserIds = [];
        
        foreach ($recentMessage as $message) {
            $userId = $message->sender_id == $senderId ? $message->receiver_id : $message->sender_id;
            if(!in_array($userId,$usedUserIds)){
                $recentUserWithMessages[]=[
                    'user_id' => $userId,
                    'messages' => $message->message,
                    'recent_count'=>Message::where('receiver_id',auth()->user()->id)
                        ->where('sender_id',$message->sender_id)
                        ->where('read_status',0)->count()
                ] ;

                
                $usedUserIds[]= $userId;
                
            }
            
        }
        // dd($recentUserWithMessages);

        foreach ($recentUserWithMessages as $key=>$userMessages) {
            $recentUserWithMessages [$key]['user'] = Profile::where('user_id',$userMessages['user_id'])->get() ?? '';
        }

        return $recentUserWithMessages;
    }
    public function sendMessage(array $data)
    {
        return Message::create($data);
    }
}

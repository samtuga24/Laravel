<?php
namespace App\Repositories;
use App\Models\Notification;

class NotificationRepository
{
    public function show(int $senderId, int $receiverId)
    {
        return Notification::whereIn('sender_id', [$senderId, $receiverId])
            ->whereIn('receiver_id', [$senderId, $receiverId])
            ->get();
    }

    public function sendNotification(array $data)
    {
        return Notification::create($data);
    }
}

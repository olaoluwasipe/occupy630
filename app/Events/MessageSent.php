<?php

namespace App\Events;

use App\Models\Chat;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    /**
     * Create a new event instance.
     */
    public function __construct(Chat $chat)
    {
        $this->message = $chat->load(['sent', 'received']);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        // Broadcast to both sender and receiver's private channels
        return [
            new PrivateChannel('user.' . $this->message->sender_id),
            new PrivateChannel('user.' . $this->message->receiver_id),
        ];
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'message.sent';
    }

    /**
     * Get the data to broadcast.
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->message->id,
            'sender_id' => $this->message->sender_id,
            'receiver_id' => $this->message->receiver_id,
            'message' => $this->message->message,
            'attachments' => $this->message->attachments,
            'read' => $this->message->read ?? 0,
            'created_at' => $this->message->created_at,
            'sent' => [
                'id' => $this->message->sent->id,
                'fname' => $this->message->sent->fname,
                'lname' => $this->message->sent->lname,
                'profile_photo' => $this->message->sent->profile_photo,
            ],
            'received' => [
                'id' => $this->message->received->id,
                'fname' => $this->message->received->fname,
                'lname' => $this->message->received->lname,
                'profile_photo' => $this->message->received->profile_photo,
            ],
        ];
    }
}

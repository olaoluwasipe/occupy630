<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MessageNotifier extends Mailable
{
    use Queueable, SerializesModels;

    public $sender;
    public $messageContent;
    public $subjectText;
    public $link;

    /**
     * Create a new message instance.
     */
    public function __construct($sender, $messageContent, $subjectText, $link)
    {
        $this->sender = $sender;
        $this->messageContent = $messageContent;
        $this->subjectText = $subjectText;
        $this->link = $link;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Message From ' . $this->sender->fullname,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.message-notification',
            with: [
                'sender' => $this->sender->fullname,
                'messageContent' => $this->messageContent,
                'subjectText' => $this->subjectText,
                'link' => $this->link,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}

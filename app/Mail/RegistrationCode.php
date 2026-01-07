<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RegistrationCode extends Mailable
{
    use Queueable, SerializesModels;

    private $sender;

    private $receiver;

    private $code;

    /**
     * Create a new message instance.
     */
    public function __construct($sender, $receiver, $code)
    {
        $this->sender = $sender;
        $this->receiver = $receiver;
        $this->code = $code;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->sender->fullname . " has invited you to join " . $this->sender->company->name . " on Occupy630",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.registeration-code',
            with: [
                'sender'=> $this->sender,
                'receiver'=> $this->receiver,
                'code'=> $this->code,
                'link' => route('register', [
                    'code' => $this->code,
                    'email' => $this->receiver,
                    'type' => 'employee',
                ]),
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

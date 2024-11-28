<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $subject;

    public $message;

    public $link;

    public $header;

    public $pdf;

    public $reference;

    /**
     * Create a new message instance.
     */
    public function __construct($subject, $message, $link, $header, $pdf = null, $reference = null)
    {
        $this->subject = $subject;
        $this->message = $message;
        $this->link = $link;
        $this->header = $header;
        $this->pdf = $pdf;
        $this->reference = $reference;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.mail-notification',

            with: [
                'subject' => $this->subject,
                'message' => $this->message,
                'link' => $this->link,
                'header' => $this->header,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        if($this->pdf) {
            return [
                Attachment::fromData(fn () => $this->pdf->output(), $this->reference . '.pdf')
                    ->withMime('application/pdf'),
            ];
        } else {
            return [];
        }
    }
}

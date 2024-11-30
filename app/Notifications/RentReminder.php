<?php
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class RentReminder extends Notification
{
    protected $dueDate;
    protected $link;
    protected $reminderType;

    public function __construct($dueDate, $link, $reminderType)
    {
        $this->dueDate = $dueDate;
        $this->link = $link;
        $this->reminderType = $reminderType;
    }

    public function via($notifiable)
    {
        return ['mail']; // Use the email notification channel
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject("Rent Payment Reminder - {$this->reminderType} Left")
            ->line("This is a reminder that your rent payment is due {$this->reminderType}.")
            ->line("Due Date: {$this->dueDate}")
            ->action('Pay Now', $this->link)
            ->line('Please make your payment promptly to avoid penalties.');
    }
}

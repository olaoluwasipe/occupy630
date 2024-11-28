<x-mail::message>
# New Message Notification

You have received a new message from **{{ $sender->fullname }}**.

---

**Message:**
> {{ $messageContent }}

---


<x-mail::button :url="$link">
    Go to Homepage
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>

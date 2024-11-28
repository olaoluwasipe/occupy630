<x-mail::message>
# Invitation Code

You have received an invitation code from **{{ $sender->fullname }}**.

---

**Invitation Code:**
> {{ $code }}

Register with the code to join {{ $sender->company->name }}.

---

<x-mail::button :url="$link">
Register Now
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>

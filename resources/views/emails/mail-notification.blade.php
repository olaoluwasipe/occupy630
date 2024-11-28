<x-mail::message>
# {{$header}}

{{$message}}

<x-mail::button :url="$link">
Click Here
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>


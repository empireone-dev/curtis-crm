@component('mail::message')
Hi {!! $data['name']!!}

{!! $data['body'] !!}
@endcomponent

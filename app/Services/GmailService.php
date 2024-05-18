<?php

namespace App\Services;

use GuzzleHttp\Client;

class GmailService
{
    protected $client;

    public function __construct()
    {
        $username = config('services.gmail.username');
        $password = config('services.gmail.password');

        $this->client = new Client([
            'base_uri' => 'https://mail.google.com/',
            'auth' => [$username, $password],
        ]);
    }

    public function getInbox()
    {
        $response = $this->client->request('GET', 'gmail/v1/users/me/messages');
        return json_decode($response->getBody(), true);
    }
}

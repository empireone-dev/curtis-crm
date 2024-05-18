<?php

namespace App\Services;

use Webklex\PHPIMAP\ClientManager;

class EmailService
{
    protected $client;

    public function __construct()
    {
        $clientManager = new ClientManager();
        $this->client = $clientManager->make([
            'host'          => env('IMAP_HOST'),
            'port'          => env('IMAP_PORT'),
            'encryption'    => env('IMAP_ENCRYPTION'),
            'validate_cert' => env('IMAP_VALIDATE_CERT'),
            'username'      => env('IMAP_USERNAME'),
            'password'      => env('IMAP_PASSWORD'),
            'protocol'      => 'imap'
        ]);
    }

    public function fetchEmails()
    {
        $this->client->connect();
        $folder = $this->client->getFolder('INBOX');
        $messages = $folder->query()->all()->limit(5)->get(); // Limit to 3 messages

        $emails = [];

        foreach ($messages as $message) {
            $from = $message->getFrom();
            $emails[] = [
                'subject' => $message->getSubject()[0],
                'body'    => $message->getTextBody(),
                'from'    => $from[0]->mail,
                'date'    => $message->getDate()[0],
            ];
        }

        return $messages;
    }
}

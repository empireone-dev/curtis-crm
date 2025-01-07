<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;
use Exception;

class USPSService
{
    // private $apiUrl;
    // private $userId;

    // public function __construct()
    // {
    //     $this->apiUrl =  env('USPS_API_URL');
    //     $this->userId = env('USPS_API_USERID');
    // }

    // public function zipCodeLookup($address)
    // {
    //     $xml = "<ZipCodeLookupRequest USERID=\"{$this->userId}\">" .
    //            "<Address>" .
    //            "<Address1>{$address['address1']}</Address1>" .
    //            "<Address2>{$address['address2']}</Address2>" .
    //            "<City>{$address['city']}</City>" .
    //            "<State>{$address['state']}</State>" .
    //            "</Address>" .
    //            "</ZipCodeLookupRequest>";

    //     $response = Http::get($this->apiUrl, [
    //         'API' => 'ZipCodeLookup',
    //         'XML' => $xml,
    //     ]);

    //     return $response->body();
    // }
    protected $client;
    protected $apiUrl = 'https://api.usps.com/addresses/v3/address'; // The USPS API endpoint
    protected $apiKey; // You should store your USPS API key securely, preferably in .env

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('USPS_API_KEY'); // Store your API key in .env file
    }

    public function validateAddress(array $addressData)
    {
        try {
            $response = $this->client->post($this->apiUrl, [
                'headers' => [
                    'Authorization' => 'Bearer epE1aGCUJFdf7jhQpzuyqLrFB0aO7wAc',  // If USPS uses bearer token for authentication
                ],
                'form_params' => [
                    'address' => $addressData,
                ]
            ]);
            return json_decode($response->getBody()->getContents(), true);
        } catch (Exception $e) {
            return ['error' => 'Unable to reach USPS API. ' . $e->getMessage()];
        }
    }
}

<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class FedexService
{
    protected $apiUrl;
    protected $apiKey;
    protected $apiSecret;

    public function __construct()
    {
        // Use https://apis-sandbox.fedex.com for testing
        // Use https://apis.fedex.com for production
        $this->apiUrl = env('FEDEX_API_URL', 'https://apis-sandbox.fedex.com');
        $this->apiKey = env('FEDEX_API_KEY');
        $this->apiSecret = env('FEDEX_SECRET_KEY');
    }

    /**
     * Get FedEx OAuth Token (Cached to avoid rate limits)
     */
    protected function getAccessToken()
    {
        return Cache::remember('fedex_access_token', 3000, function () {
            $response = Http::asForm()->post("{$this->apiUrl}/oauth/token", [
                'grant_type' => 'client_credentials',
                'client_id' => $this->apiKey,
                'client_secret' => $this->apiSecret,
            ]);

            if ($response->failed()) {
                throw new \Exception('Failed to authenticate with FedEx: ' . $response->body());
            }

            return $response->json('access_token');
        });
    }

    /**
     * Get Shipping Rates from REST API
     */
    public function getRates($accountNumber, $shipperAddress, $recipientAddress, $packageDetails, $currency)
    {
        $token = $this->getAccessToken();
    
        $payload = [
            'accountNumber' => [
                'value' => $accountNumber
            ],
            'requestedShipment' => [
                'preferredCurrency' => $currency,
                'shipper' => [
                    // ADDED: Explicitly define the shipper's account number
                    'accountNumber' => [
                        'value' => $accountNumber
                    ],
                    'address' => $shipperAddress
                ],
                'recipient' => [
                    'address' => $recipientAddress
                ],
                'shippingChargesPayment' => [
                    'paymentType' => 'SENDER',
                    'payor' => [
                        'responsibleParty' => [
                            'accountNumber' => [
                                'value' => $accountNumber
                            ]
                        ]
                    ]
                ],
                'pickupType' => 'DROPOFF_AT_FEDEX_LOCATION',
                'rateRequestType' => [
                    'ACCOUNT',
                    'LIST'
                ],
                'requestedPackageLineItems' => [
                    $packageDetails
                ]
            ]
        ];

        $response = Http::withToken($token)
            ->post("{$this->apiUrl}/rate/v1/rates/quotes", $payload);

        if ($response->failed()) {
            return [
                'success' => false,
                'error' => $response->json()
            ];
        }

        return [
            'success' => true,
            'data' => $response->json()
        ];
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request as LRequest;
use App\Models\Ticket;
use App\Services\FedexService;

class ShippingController extends Controller
{
    protected $fedexService;

    public function __construct(FedexService $fedexService)
    {
        $this->fedexService = $fedexService;
    }

    public function get_new_fedex_rate(LRequest $request, $id)
    {
        $ticket = Ticket::where('id', $id)->first();

        // Return error if ticket doesn't exist or isn't US/CA
        if (!$ticket || !in_array($ticket->country, ['US', 'CA'])) {
            return response()->json(['message' => 'Invalid ticket or unsupported country'], 400);
        }

        // 1. Setup Country-Specific Variables
        if ($ticket->country == 'US') {
            $accountNumber = '740561073'; // US Account
            $currency = 'USD';
            $shipper = [
                'streetLines' => ['2626 Vista Industria Unit 15'],
                'city' => 'Compton',
                'stateOrProvinceCode' => 'CA',
                'postalCode' => '90221',
                'countryCode' => 'US'
            ];
        } else { // CA
            $accountNumber = '740561073'; // CA Account
            $currency = 'CAD';
            $shipper = [
                'streetLines' => ['7045 Beckett St', 'Unit 15'],
                'city' => 'Mississauga',
                'stateOrProvinceCode' => 'ON',
                'postalCode' => 'L5S2A3',
                'countryCode' => 'CA'
            ];
        }

        // 2. Setup Recipient from Ticket
        $recipient = [
            'streetLines' => [$ticket->address],
            'city' => $ticket->city,
            // FedEx requires a strict 2-letter state code. Consider adding validation here if needed.
            'stateOrProvinceCode' => $ticket->state,
            'postalCode' => $ticket->zip_code,
            'countryCode' => $ticket->country
        ];
        

        // 3. Setup Package Dimensions & Weight
        // We use max(1, ...) to ensure the value is NEVER 0. FedEx rejects 0 weight/dimensions.
        $packageDetails = [
            'weight' => [
                'units' => 'LB',
                'value' => max(1, round(floatval($request->cubed_weight)))
            ],
            'dimensions' => [
                'length' => max(1, (int) round(floatval($request->length))),
                'width'  => max(1, (int) round(floatval($request->width))),
                'height' => max(1, (int) round(floatval($request->height))),
                'units'  => 'IN'
            ],
            'groupPackageCount' => 1
        ];

        // 4. Call the FedEx Service
        $result = $this->fedexService->getRates($accountNumber, $shipper, $recipient, $packageDetails, $currency);

        if (!$result['success']) {
            return response()->json([
                'message' => 'Failed to fetch rates',
                'error' => $result['error']
            ], 400);
        }

        // 5. Format the response to match your old SOAP array structure
        $rates = [];
        $rateDetails = $result['data']['output']['rateReplyDetails'] ?? [];

        foreach ($rateDetails as $rateReplyDetail) {
            $serviceType = $rateReplyDetail['serviceType'];

            $rates[$serviceType] = [
                'SERVICE' => $serviceType
            ];

            if (!empty($rateReplyDetail['ratedShipmentDetails'])) {
                foreach ($rateReplyDetail['ratedShipmentDetails'] as $ratedShipmentDetail) {
                    $rateType = $ratedShipmentDetail['rateType'];
                    $amount = $ratedShipmentDetail['totalNetCharge'] ?? 0;

                    $rates[$serviceType][$rateType] = $amount;
                }
            }
        }

        return response()->json([
            'rates' => $rates,
            'ticket' => $ticket
        ]);
    }
}

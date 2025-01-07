<?php

namespace App\Http\Controllers;

use App\Services\USPSService;
use Illuminate\Http\Request;

class UspsController extends Controller
{

    protected $uspsService;
    protected $uspsApiService;

    public function __construct(USPSService $uspsService)
    {
        // $this->uspsService = $uspsService;
        $this->uspsApiService = $uspsService;
    }

    public function validateAddress(Request $request)
    {
        $addressData = $request->all();

        // Validate address fields before sending to USPS API (you can add more validations as needed)
        // $validatedData = $request->validate([
        //     'address.street' => 'required|string',
        //     'address.city' => 'required|string',
        //     'address.state' => 'required|string',
        //     'address.zip' => 'required|string',
        // ]);

        $response = $this->uspsApiService->validateAddress($addressData);

        if (isset($response['error'])) {
            return response()->json(['error' => $response['error']], 500);
        }

        return response()->json($response);
    }
    // public function zipCodeLookup(Request $request)
    // {
    //     $validated = $request->validate([
    //         'address1' => 'nullable|string',
    //         'address2' => 'nullable|string',
    //         'city' => 'nullable|string',
    //         'state' => 'nullable|string|max:2',
    //         'zip' => 'nullable|string',
    //     ]);

    //     $response = $this->uspsService->zipCodeLookup($validated);

    //     return response($response, 200)
    //         ->header('Content-Type', 'application/xml');
    // }
}

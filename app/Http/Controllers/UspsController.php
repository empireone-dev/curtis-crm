<?php

namespace App\Http\Controllers;

use App\Services\USPSService;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UspsController extends Controller
{

    protected $uspsService;

    public function __construct(USPSService $uspsService)
    {
        $this->uspsService = $uspsService;
    }

    public function getToken()
    {
        // Initialize Guzzle HTTP client
        $client = new Client();

        try {
            // Send POST request to USPS OAuth2 token endpoint
            $response = $client->post(env('USPS_OAUTH_URL'), [
                'json' => [
                    'client_id' => env('USPS_CLIENT_ID'),
                    'client_secret' => env('USPS_CLIENT_SECRET'),
                    'grant_type' => 'client_credentials',  // Client credentials grant type
                ],
            ]);

            // Decode the JSON response
            $data = json_decode($response->getBody(), true);

            // Check for access token and store it for later use (in session or cache)
            if (isset($data['access_token'])) {
                // Store token in session or cache for later use
                session(['usps_access_token' => $data['access_token']]);

                // Optionally, log the response or return the token
                return response()->json($data);
            } else {
                // Handle error if no token returned
                Log::error('Failed to retrieve USPS token', ['response' => $data]);
                return response()->json(['error' => 'Failed to retrieve token.'], 500);
            }
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error retrieving USPS token', ['exception' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to retrieve token.'], 500);
        }
    }

    // Example method to use the token in another request (e.g., fetching tracking info)
    public function address_lookup(Request $request)
    {
        $validated = $request->validate([
            'Address1' => 'nullable|string',
            'Address2' => 'nullable|string',
            'City' => 'nullable|string',
            'State' => 'nullable|string',
        ]);
    
        try {
            // Construct XML payload
            $xml = "
            <AddressValidateRequest USERID='415XCURTI3325'>
                <Address ID='0'>
                    <Address1>{$validated['Address1']}</Address1>
                    <Address2>{$validated['Address2']}</Address2>
                    <City>{$validated['City']}</City>
                    <State>{$validated['State']}</State>
                    <Zip5></Zip5>
                    <Zip4></Zip4>
                </Address>
            </AddressValidateRequest>";
    
            // Send GET request to the USPS Address Validation API
            $response = Http::get(env('USPS_BASE_URL'), [
                'API' => 'Verify',
                'XML' => $xml,
            ]);
    
            // Check if the response is successful
            if ($response->successful()) {
                return response()->json([
                    'status' => 'success',
                    'data' => $response->body(),
                ]);
            }
    
            // Handle non-200 responses
            return response()->json([
                'status' => 'error',
                'message' => 'Address validation failed',
                'details' => $response->body(),
            ], $response->status());
        } catch (\Exception $e) {
            // Handle exceptions
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
    
    // public function address_lookup(Request $request)
    // {
    //        $validated = $request->validate([
    //         'address1' => 'nullable|string|max:255',
    //         'address2' => 'nullable|string|max:255',
    //         'city'     => 'nullable|string|max:255',
    //         'state'    => 'required|string|max:2',
    //         'zip5'     => 'nullable|string|max:5',
    //         'zip4'     => 'nullable|string|max:4',
    //     ]);

    //     $result = $this->uspsService->verifyAddress($validated);

    //     return response()->json($result);
    // }

}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AddressLookupController extends Controller
{
 
    /**
     * Lookup US city and state using ZIP code.
     */
    public function address_lookup(Request $request)
    {
        // Validate the incoming request parameters
        $request->validate([
            'street' => 'required|string',
            'zip_code' => 'required|string',
        ]);
    
        // Extract inputs from the request
        $street = $request->input('street');
        $zipCode = $request->input('zip_code');
        $query = $street . ', ' . $zipCode;
    
        // Google Maps API URL
        $apiKey = env('VITE_GOOGLE_MAP_API_KEY'); // Ensure your API key is correctly set
        $url = 'https://maps.googleapis.com/maps/api/geocode/json';
    
        // Make the API request to Google Maps Geocoding API
        $response = Http::get($url, [
            'address' => $query,
            'key' => $apiKey,
        ]);
    
        // Check if the request was successful
        if ($response->successful()) {
            $data = $response->json();
    
            // Check if results are found
            if (!empty($data['results'])) {
                // Initialize an array to store multiple matches
                $results = [];
    
                foreach ($data['results'] as $result) {
                    $location = $result['address_components'];
                    $country = '';
                    $state = '';
                    $state_abbr = '';
                    $country_abbr = '';
                    $city = '';
                    $zipcode = '';
                    $streetName = '';
                    $fullAddress = $result['formatted_address']; // The full address from Google API
    
                    // Extract country, state, city, street, and zipcode from each result
                    foreach ($location as $component) {
                        if (in_array('country', $component['types'])) {
                            $country = $component['long_name'];
                            $country_abbr = $component['short_name'];
                        }
                        if (in_array('administrative_area_level_1', $component['types'])) {
                            $state = $component['long_name'];
                            $state_abbr = $component['short_name'];
                            
                        }
                        if (in_array('locality', $component['types'])) {
                            $city = $component['long_name'];
                        }
                        if (in_array('postal_code', $component['types'])) {
                            $zipcode = $component['long_name']; // The complete ZIP code
                        }
                        if (in_array('route', $component['types'])) {
                            $streetName = $component['long_name']; // The street name
                        }
                    }
    
                    $results[] = [
                        'country' => $country ?? 'Not found',
                        'country_abbr' => $country_abbr ?? 'Not found',
                        'state' => $state ?? 'Not found',
                        'state_abbr' => $state_abbr ?? 'Not found',
                        'city' => $city ?? 'Not found',
                        'zipcode' => $zipcode ?? 'Not found',
                        'street' => $streetName ?? 'Not found', // The street name
                        'address' => $fullAddress ?? 'Not found', // The full address
                    ];
                }
    
                // Return all matching results
                return response()->json(['results' => $results]);
            }
    
            // If no results are found
            return response()->json(['error' => 'Location not found'], 404);
        }
    
        // If the API request failed (e.g., invalid key or server error)
        return response()->json(['error' => 'Failed to fetch data. Please try again later.'], 500);
    }
    
    
    

    /**
     * Lookup Canadian city and address using postal code.
     */
    public function lookupCanada(Request $request)
    {
      
    }
}

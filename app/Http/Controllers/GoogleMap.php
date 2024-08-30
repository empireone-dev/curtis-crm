<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

use Illuminate\Http\Request;

class GoogleMap extends Controller
{
    public function get_cities(Request $request)
    {
        // $country = $request->input('country');
        // $state = $request->input('state');

        // if ($country && $state) {
            $city = $request->input('city');
            $state = $request->input('state');
            $country = $request->input('country');
            $zip_code = $request->input('zip_code');
            $address = "{$city}, {$state}, {$country}, {$zip_code}";

            $response = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
                'address' => $address,
                'key' => env('VITE_GOOGLE_MAP_API_KEY'),
            ]);
        
            $data = $response->json();
        
            // Process the response
            if ($data['status'] === 'OK') {
                $results = $data['results'];
                // Extract street information or other details as needed
                return $results;
            } else {
                // Handle errors
                return [];
            }
            

        // } else {
        // \Log::warning('Missing required fields:', ['country' => $country, 'state' => $state]);
        // return response()->json(['error' => 'Missing required fields'], 400);
        // }
        // return response()->json([
        //     'url' => $cities
        // ], 200);
    }
}

<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;

use Illuminate\Http\Request;

class GoogleMap extends Controller
{
    public function get_cities(){
        // $country = $request->input('country');
        // $state = $request->input('state');
    
        // if ($country && $state) {
            try {
    
                $url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
                $response = Http::get($url, [
                    'input' => 'NC',
                    'types' => '(cities)',
                    'components' => 'country:us',
                    'key' => env('VITE_GOOGLE_MAP_API_KEY')
                ]);
    
                $data = $response->json();
    
                return response()->json($data);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to fetch address suggestions'], 500);
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

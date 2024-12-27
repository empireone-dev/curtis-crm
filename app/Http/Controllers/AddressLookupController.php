<?php

namespace App\Http\Controllers;

use App\Services\USPSService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AddressLookupController extends Controller
{
   
    public function address_lookup(Request $request)
    {
        $query = $request->input('q');

        if (!$query) {
            return response()->json(['error' => 'Query parameter (q) is required'], 400);
        }

        $apiKey = env('VITE_API_KEY');
        $url = "https://geocode.search.hereapi.com/v1/geocode";

        $response = Http::get($url, [
            'q' => $query,
            'apiKey' => $apiKey,
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch geocode data'], $response->status());
        }

        return response()->json($response->json());
    }
}
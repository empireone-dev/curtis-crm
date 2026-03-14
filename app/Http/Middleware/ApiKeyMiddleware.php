<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\ApiKey;
use Illuminate\Http\Request;

class ApiKeyMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $header = $request->header('Authorization');

        if (!$header || !str_starts_with($header, 'Bearer ')) {
            return response()->json(['message' => 'Missing API key'], 401);
        }

        $token = substr($header, 7); // remove "Bearer "
        if (!ApiKey::where('key', hash('sha256', $token))->exists()) {
            return response()->json(['message' => 'Invalid API key'], 401);
        }

        return $next($request);
    }
}

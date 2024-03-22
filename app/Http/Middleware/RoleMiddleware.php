<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role_id)
    {
        if (!$request->user() || !$this->checkRole($request->user()->role_id, $role_id)) {
            abort(403, 'Unauthorized.');
        }

        return $next($request);
    }

    private function checkRole($userRoleId, $requiredRoleId)
    {
        // Define your logic for checking the role here
        return $userRoleId == $requiredRoleId;
    }
}

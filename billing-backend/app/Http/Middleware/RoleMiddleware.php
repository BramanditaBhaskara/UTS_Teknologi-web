<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        // Jika role user tidak termasuk dalam parameter role middleware
        if (!in_array($user->role, $roles)) {
            return response()->json(['message' => 'Akses ditolak, tidak memiliki izin'], 403);
        }

        return $next($request);
    }
}

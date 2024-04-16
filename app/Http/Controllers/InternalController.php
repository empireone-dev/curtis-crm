<?php

namespace App\Http\Controllers;

use App\Models\Internal;
use App\Models\Ticket;
use Illuminate\Http\Request;

class InternalController extends Controller
{
    public function store(Request $request)
    {
        foreach ($request->parts as $key => $value) {
            Internal::create($value);
        }
        $ticket = Ticket::where('id', $request->ticket_id)->first()
            ->update([
                'status' => $request->status
            ]);
        return response()->json([
            'status' => $ticket
        ], 200);
    }
}

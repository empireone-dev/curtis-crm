<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Internal;
use App\Models\Ticket;
use Illuminate\Http\Request;

class InternalController extends Controller
{
    public function store(Request $request)
    {
        foreach ($request->parts as $value) {
            if (isset($value['id'])) {
                $internal = Internal::where('id', $value['id'])->first();
                $internal->update([
                    'name' => $value['name'],
                    'part_number' => $value['part_number'] ?? '',
                    'location' => $value['location'] ?? '',
                    'cost' => $value['cost'],
                    'status' => $value['status'],
                ]);
            } else {
                Internal::create([
                    'ticket_id' => $request->ticket_id,
                    'name' => $value['name'],
                    'part_number' => $value['part_number'] ?? '',
                    'location' => $value['location'] ?? '',
                    'cost' => $value['cost'],
                    'status' => $value['status'],
                ]);
            }
        }

        Ticket::where('id', $request->ticket_id)->first()
            ->update([
                'status' => $request->status,
                'internal_notes' => $request->internal_notes
            ]);

        $ticket = Ticket::where('id', $request->ticket_id)->first();
        $ticketArray = $ticket instanceof Ticket ? $ticket->toArray() : [];

        Activity::create([
            'user_id' => $request->user['id'],
            'ticket_id' => $request->ticket_id,
            'type' => 'INTERNALS',
            'message' => json_encode(array_merge($ticketArray, ['internals' => $request->parts]))
        ]);

        return response()->json([
            'status' => $request->parts
        ], 200);
    }

    public function show($ticket_id)
    {
        $internals = Internal::where('ticket_id', $ticket_id)->get();
        return response()->json([
            'status' => $internals
        ], 200);
    }
}

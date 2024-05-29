<?php

namespace App\Http\Controllers;

use App\Models\AgentNote;
use Illuminate\Http\Request;

class AgentNoteController extends Controller
{
    public function index($ticketid)
    {
        $notes = AgentNote::where('ticket_id', $ticketid)->with('user')->orderBy('id','desc')->get();
        return $notes;
    }

    public function show($ticketid)
    {
        return response()->json([
            'data' => $this->index($ticketid)
        ], 200);
    }

    public function store(Request $request)
    {

        AgentNote::create([
            'user_id' => $request->user_id,
            'ticket_id' => $request->ticket_id,
            'message' => $request->message,
        ]);
        return response()->json([
            'data' => $this->index($request->ticket_id)
        ], 200);
    }
}

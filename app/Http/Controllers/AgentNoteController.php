<?php

namespace App\Http\Controllers;

use App\Models\AgentNote;
use App\Models\CasesLog;
use App\Models\Ticket;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AgentNoteController extends Controller
{
    public function index($ticketid)
    {
        $notes = AgentNote::where('ticket_id', $ticketid)->with('user')->orderBy('id', 'desc')->get();
        $ticket = Ticket::where('id', $ticketid)->first();
        if ($ticket) {
            $ticket->update([
                'latest_updated' => Carbon::today()
            ]);
        }
        return $notes;
    }

    public function show($ticketid)
    {

        $cases_logs = CasesLog::where('ticket_id', $ticketid)->with(['user'])->get();
        return response()->json([
            'agent_notes' => $this->index($ticketid),
            'cases_logs' => $cases_logs
        ], 200);
    }

    public function store(Request $request)
    {
        $auth = Auth::user();

        AgentNote::create([
            'user_id' => $auth->id,
            'ticket_id' => $request->ticket_id,
            'message' => $request->message,
        ]);

        ActivityController::create_activity(
            $auth->id,
            $request->ticket_id,
            $request->message,
            'Agent Notes'
        );
        return response()->json([
            'data' => $this->index($request->ticket_id)
        ], 200);
    }
}

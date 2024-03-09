<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{

    public function index(Request $request)
    {
        $query = Ticket::query();
    
        if ($request->has('ticket_id')) {
            if($request->ticket_id){
                $query->where('id', $request->ticket_id);
            }
        }
    
        $data = $query->get();
    
        return response()->json([
            'result' => $data,
        ], 200);
    }
    
    public function store(Request $request)
    {
        $data = Ticket::create($request->all());
        return response()->json([
            'result' => $data,
        ], 200);
    }
}

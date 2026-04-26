<?php

namespace App\Http\Controllers;

use App\Models\TechCallBack;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TechCallBackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        TechCallBack::create([
            'ticket_id' => $request->id,
            'csr_id' => Auth::id(),
            'note' => $request->notes
        ]);
        $ticket = Ticket::where('id', $request->id)->first();
        if ($ticket) {
            $ticket->update([
                'status' => 'TECH CALLBACK'
            ]);
        }
        return response()->json([
            'status' => 'success',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(TechCallBack $techCallBack)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TechCallBack $techCallBack)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TechCallBack $techCallBack)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TechCallBack $techCallBack)
    {
        //
    }
}

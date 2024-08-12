<?php

namespace App\Http\Controllers;

use App\Models\DirectEmail;
use Illuminate\Http\Request;

class DirectEmailController extends Controller
{
    public function transfer_direct_email(Request $request)
    {
        $ticket = DirectEmail::where('id', $request->id)->first();
        $ticket->update([
            'user_id'=>$request->user_id
        ]);
        return response()->json([
            'result' => $ticket
        ], 200);
    }
    public function show($id){
        $ticket = DirectEmail::where('id', $id)->first();
        return response()->json([
            'result' => $ticket
        ], 200);
    }
}

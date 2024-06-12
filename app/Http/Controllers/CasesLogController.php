<?php

namespace App\Http\Controllers;

use App\Models\CasesLog;
use App\Models\DirectEmail;
use Illuminate\Http\Request;

class CasesLogController extends Controller
{
    public function show($id)
    {
        $logs = CasesLog::where('ticket_id', $id)->with('user')->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 'success',
            'data' => $logs
        ], 200);
    }
    public function store(Request $request)
    {
        CasesLog::create($request->all());
        $logs = CasesLog::where('ticket_id', $request->ticket_id)->with('user')->get();
        $direct = DirectEmail::where('id', $request->ticket_id)->first();
        if ($direct) {
            $direct->update([
                'isHide' => 'true'
            ]);
        }
        return response()->json([
            'status' => 'success',
            'data' => $logs
        ], 200);
    }
}

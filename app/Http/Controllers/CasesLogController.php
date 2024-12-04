<?php

namespace App\Http\Controllers;

use App\Models\CasesLog;
use App\Models\CustomerDetailsLog;
use App\Models\DirectEmail;
use App\Models\Ticket;
use Illuminate\Http\Request;

class CasesLogController extends Controller
{
    public function get_caseslog_by_ticket_id_direct_email($id){
        $logs = CasesLog::where([['ticket_id','=',$id],['log_from','=','direct_emails']])->with('user')->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 'success',
            'data' => $logs
        ], 200);
    }
    public function show($id)
    {
        $ticket = Ticket::where('ticket_id', $id)->first();
        $logs = CasesLog::where('ticket_id', $ticket->id)->with('user')->orderBy('id', 'desc')->get();
        $customer_logs = CustomerDetailsLog::where('ticket_id', $id)->with(['transfer_from', 'transfer_to'])->get();
        return response()->json([
            'status' => 'success',
            'data' => $logs,
            'customer_logs' => $customer_logs,
        ], 200);
    }
    public function store(Request $request)
    {
        CasesLog::create($request->all());
        $logs = CasesLog::where('ticket_id', $request->ticket_id)->with('user')->get();
        Ticket::where('id',$request->ticket_id)->update([
            'is_reply'=>null
        ]);
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

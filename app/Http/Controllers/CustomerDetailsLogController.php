<?php

namespace App\Http\Controllers;

use App\Models\CustomerDetailsLog;
use Illuminate\Http\Request;

class CustomerDetailsLogController extends Controller
{
    public function store(Request $request)
    {
        CustomerDetailsLog::create($request->all());
        return response()->json([
            'status' => 'success',
        ], 200);
    }
    // public function show($id)
    // {
    //     $res = CustomerDetailsLog::where('transfer_from', $id)->with(['transfer_from', 'transfer_to'])->get();
    //     return response()->json([
    //         'status' => $res,
    //     ], 200);
    // }
}

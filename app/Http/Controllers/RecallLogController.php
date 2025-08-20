<?php

namespace App\Http\Controllers;

use App\Models\Recall;
use App\Models\RecallLog;
use Illuminate\Http\Request;

class RecallLogController extends Controller
{
    public function store(Request $request)
    {
        // Logic to store recall log data
        $data = $request->all();
        // Assuming you have a RecallLog model to handle the database interaction
        $recall = Recall::where('id', $data['recall_id'])->first();
        if ($recall) {
            $recall->update(['isHide' => 'true']);
        }
        $recallLog = RecallLog::create($data);
        return response()->json($recallLog, 200);
    }
}

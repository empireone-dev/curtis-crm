<?php

namespace App\Http\Controllers;

use App\Models\Recall;
use Illuminate\Http\Request;

class RecallController extends Controller
{
    public function index()
    {
        $recalls = Recall::where('isHide', '<>', 'true')->orderBy('id', 'desc')->get();
        // Logic to retrieve and return recall data
        return response()->json($recalls, 200);
    }

    public function show($id)
    {
        $recall = Recall::where('id', $id)->with(['logs', 'user'])->first();
        // Logic to retrieve and return a specific recall
        return response()->json($recall, 200);
    }
}

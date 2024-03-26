<?php

namespace App\Http\Controllers;

use App\Models\CommonIssue;
use Illuminate\Http\Request;

class CommonIssueController extends Controller
{
    public function index(){
        $common_issue = CommonIssue::get();
        return response()->json([
            'data' => $common_issue
        ], 200);
    }
    public function store(Request $request)
    {
        // Role::create($request->validate([
        //     'name' => 'required|unique:permission',
        //     'details' => 'required',
        //     'start' => 'required',
        //     'due' => 'required',
        //     'status' => 'required'
        // ]));
        // return response()->json([
        //     'status' => 'success',
        //    'data'=>$this->index()->original['data']
        // ], 200);
    }
}

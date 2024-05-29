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
        CommonIssue::create($request->validate([
            'name' => 'required|unique:common_issues',
            'parent_id' => 'required',
        ]));
        return response()->json([
            'status' => 'success',
           'data'=>$this->index()->original['data']
        ], 200);
    }

    public function destroy($id)
    {
        $common_issue = CommonIssue::find($id);
        if (!$common_issue) {
            return response()->json([
                'status' => 'error',
                'message' => 'common_issue not found'
            ], 404);
        }
    
        $common_issue->delete();
    
        $common_issues = CommonIssue::get();
        return response()->json([
            'status' => 'success',
            'data' => $common_issues
        ], 200);
    }

    public function update(Request $request, $id){
        $common_issue = CommonIssue::find($id);
        $common_issue->update($request->all());

        return response()->json([
            'data' => $this->index()->original['data']
        ], 200);
    }

}

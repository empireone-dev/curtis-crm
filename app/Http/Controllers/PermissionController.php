<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function index(){
        $permission = Permission::get();
        return response()->json([
            'data' => $permission
        ], 200);
    }
    public function store(Request $request)
    {
        // Permission::create($request->validate([
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

<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index(){
        $permission = Role::get();
        return response()->json([
            'data' => $permission
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

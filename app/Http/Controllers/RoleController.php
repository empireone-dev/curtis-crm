<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index(){
        $role = Role::get();
        return response()->json([
            'data' => $role
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

    public function destroy($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json([
                'status' => 'error',
                'message' => 'Permission not found'
            ], 404);
        }
    
        $role->delete();
    
        $role = Role::get();
        return response()->json([
            'status' => 'success',
            'data' => $role
        ], 200);
    }

    public function update(Request $request, $id){
        $role = Role::find($id);
        $role->update($request->all());

        return response()->json([
            'data' => $this->index()->original['data']
        ], 200);
    }
}

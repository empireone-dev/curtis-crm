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
        Permission::create($request->validate([
            'name' => 'required|unique:permission',
            'details' => 'required',
            'start' => 'required',
            'due' => 'required',
            'status' => 'required'
        ]));
        return response()->json([
            'status' => 'success',
           'data'=>$this->index()->original['data']
        ], 200);
    }

    public function destroy($id)
    {
        $permission = Permission::find($id);
        if (!$permission) {
            return response()->json([
                'status' => 'error',
                'message' => 'Permission not found'
            ], 404);
        }
    
        $permission->delete();
    
        $permissions = Permission::get();
        return response()->json([
            'status' => 'success',
            'data' => $permissions
        ], 200);
    }
    
    public function update(Request $request, $id){
        $permission = Permission::find($id);
        $permission->update($request->all());
        return response()->json([
            'data' => $permission
        ], 200);
    }
    
    
}

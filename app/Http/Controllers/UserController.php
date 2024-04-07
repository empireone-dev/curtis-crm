<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){

        $user = User::with('role')->limit(10)->get();
        return response()->json([
            'data' => $user
        ], 200);
        
    }
    
    public function store(Request $request)
    {
        // User::create($request->validate([
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
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'user not found'
            ], 404);
        }
    
        $user->delete();
    
        $users = user::get();
        return response()->json([
            'status' => 'success',
            'data' => $users
        ], 200);
    }
}

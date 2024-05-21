<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function get_user_by_role($role_id){
        $user = User::where('role_id','=',$role_id)->get();
        return response()->json([
            'data' => $user
        ], 200);
    }
    

    public function index(){
        $user = User::with('role')->limit(10)->get();
        return response()->json([
            'data' => $user
        ], 200);
    }

    public function show(Request $request,$role_id){
        $user = User::where('role_id','=',$role_id)->with('role')->get();
        return response()->json([
            'data' => $user
        ], 200);
    }
    
    
    public function store(Request $request)
    {
        // User::create($request->validate([
        //     'name' => 'required|unique:user',
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

    public function update(Request $request, $id){
        $user = User::find($id);
        $user->update($request->all());

        return response()->json([
            'data' => $this->index()->original['data']
        ], 200);
    }
}

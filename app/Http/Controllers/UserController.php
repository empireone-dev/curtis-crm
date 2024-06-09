<?php

namespace App\Http\Controllers;

use App\Models\CasesLog;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function get_user_by_role($role_id)
    {
        $users = User::where('role_id', '=', $role_id)->get();


        return response()->json([
            'data' => $users
        ], 200);
    }


    public function index()
    {
        $user = User::with('role')->limit(10)->get();
        return response()->json([
            'data' => $user
        ], 200);
    }

    public function show(Request $request, $role_id)
    {
        $users = User::where('role_id', '=', $role_id)->with('role')->get();
        if ($role_id == 5) {
            foreach ($users as $user) {
                $handledCount = CasesLog::where([
                    ['user_id', '=', $user->id],
                    ['log_from', '=', 'handled']
                ])->count();

                $direct_emails_count = CasesLog::where([
                    ['user_id', '=', $user->id],
                    ['log_from', '=', 'direct_emails']
                ])->count();

                // Add handled_count attribute to the user instance
                $user->handled_count = $handledCount;
                $user->handled_direct_emails = $direct_emails_count;
            }
        }

        return response()->json([
            'data' => $users
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

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->update($request->all());

        return response()->json([
            'data' => $this->index()->original['data']
        ], 200);
    }
}

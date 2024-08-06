<?php

namespace App\Http\Controllers;

use App\Models\CasesLog;
use App\Models\DirectEmail;
use App\Models\Ticket;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
        $twoDaysAgo = Carbon::now()->subDays(2)->toDateTimeString();
        $today = Carbon::today()->toDateString();
        $users = User::where('role_id', '=', $role_id)
        ->orWhere('role_id', '=', 1)
        ->with('role')->get();

        $days = date("N");

        if ($days == '4') {
            $addDays = '4';
        }else if($days == '5'){
            $addDays = '4';
        }else if($days == '6'){
            $addDays = '3';
        }else if($days == '7'){
            $addDays = '2';
        }else{
            $addDays = '2';
        }
        // $two_overdue_cases = Carbon::now()->addDays($days)->toDateTimeString();
        $today = Carbon::today();
        if ($role_id == 5) {
            foreach ($users as $user) {

                $overdue_cases = Ticket::where([
                    ['user_id', '=', $user->id],
                    ['status', '<>', 'CLOSED'],
                    ['ticket_id', '<>', null],
                    ['cases_status', '<>', 'hide'],
                    ['call_type', '=', $user->agent_type == 'Warranty'?'CF-Warranty Claim':'Parts'],
                    // ['email_date', '<=', $twoDaysAgo]
                ])
                ->whereRaw('DATE_ADD(email_date, INTERVAL ? DAY) < ?', [$addDays, $today])
                ->count();

                $cases_due_today = Ticket::where([
                    ['ticket_id', '<>', null],
                    ['user_id', '=', $user->id],
                    ['status', '<>', 'CLOSED'],
                    ['cases_status', '<>', 'hide'],
                    ['is_reply', '=', 'true'],
                    ['call_type', '=', $user->agent_type == 'Warranty' ? 'CF-Warranty Claim' : 'Parts'],
                ])
                ->whereDate(DB::raw('DATE_ADD(email_date, INTERVAL '.$addDays.' DAY)'), '=', $today)
                ->count();

                $overdue_direct_emails = DirectEmail::where('user_id', $user->id)
                    ->whereRaw('DATE_ADD(updated_at, INTERVAL 4 DAY) <= ?', [$today])
                    ->count();

                $direct_emails_due_today = DirectEmail::where('user_id', $user->id)
                    ->whereDate(DB::raw('DATE_ADD(updated_at, INTERVAL 2 DAY)'), '=', $today)
                    ->count();

                $handled_cases = CasesLog::where([
                    ['user_id', '=', $user->id],
                    ['log_from', '=', 'handled']
                ]);

                if ($request->start && $request->end) {
                    $handled_cases->whereBetween('created_at', [$request->start, $request->end]);
                } else {
                    $today = Carbon::today()->toDateString();
                    $handled_cases->whereDate('created_at', $today);
                }
                $handled_cases_count = $handled_cases->count();

                $handled_direct_emails = CasesLog::where([
                    ['user_id', '=', $user->id],
                    ['log_from', '=', 'direct_emails']
                ]);
                if ($request->start && $request->end) {
                    $handled_direct_emails->whereBetween('created_at', [$request->start, $request->end]);
                } else {
                    $today = Carbon::today()->toDateString();
                    $handled_direct_emails->whereDate('created_at', $today);
                }
                $handled_direct_emails_count = $handled_direct_emails->count();


                // Add handled_count attribute to the user instance
                $user->handled_cases = $handled_cases_count;
                $user->cases_due_today = $cases_due_today;
                $user->overdue_cases = $overdue_cases;
                $user->overdue_direct_emails = $overdue_direct_emails;
                $user->direct_emails_due_today = $direct_emails_due_today;
                $user->handled_direct_emails = $handled_direct_emails_count;
            }
        }

        return response()->json([
            'data' => $users,
            'sample' => $today
        ], 200);
    }


    public function store(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ($user) {
            return response()->json([
                'status' => 'exist',
            ], 200);
        } else {
            User::create([
                'email' => $request->email,
                'emp_id' => $request->emp_id,
                'name' => $request->name,
                'agent_type' => $request->agent_type,
                'role_id' =>  $request->agent_type == null || $request->agent_type == 'null' ? 1 : 5,
                'password' => Hash::make('Business12!@')
            ]);
            $users = User::where('role_id', '=', 5)
            ->orWhere('role_id', '=', 1)
            ->with('role')->get();
            return response()->json([
                'status' => $users,
            ], 200);
        }
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
        $users = User::where('role_id', '=', 5)->with('role')->get();
        return response()->json([
            'data' => $users
        ], 200);
    }
}

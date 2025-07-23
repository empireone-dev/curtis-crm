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
    public function get_user_by_id($id)
    {
        $users = User::where('id', '=', $id)->first();
        return response()->json([
            'data' => $users
        ], 200);
    }
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
        $today = Carbon::today()->toDateString();
        $users = User::where('role_id', '=', $role_id)
            ->orWhere('role_id', '=', 1)
            ->with('role')->get();

        if ($role_id == 5) {
            foreach ($users as $user) {

                $overdue_cases = Ticket::where([
                    ['user_id', '=', $user->id],
                    ['ticket_id', '<>', null],
                    ['cases_status', '<>', 'hide'],
                    ['is_reply', '=', 'true'],
                    ['call_type', '=', $user->agent_type == 'Warranty' ? 'CF-Warranty Claim' : 'Parts'],
                ])->get();

                foreach ($overdue_cases as &$value) {
                    $emailDate = Carbon::parse($value->email_date);
                    $dayOfWeek = $emailDate->dayOfWeekIso;
                    if ($dayOfWeek == 4 || $dayOfWeek == 5) {
                        $addDay = 4;
                    } elseif ($dayOfWeek == 6) {
                        $addDay = 3;
                    } elseif ($dayOfWeek == 7) {
                        $addDay = 2;
                    } else {
                        $addDay = 2;
                    }
                    $value->email_date = $emailDate->addDays($addDay)->format('Y-m-d');
                }

                $upcoming_dues = $overdue_cases->filter(function ($ticket) use ($today) {
                    return $ticket->email_date > $today;
                })->count();
                $overdue_cases = $overdue_cases->filter(function ($ticket) use ($today) {
                    return $ticket->email_date < $today;
                })->count();

                //End over due 

                //start due today
                $cases_due_today = Ticket::where([
                    ['user_id', '=', $user->id],
                    ['ticket_id', '<>', null],
                    ['cases_status', '<>', 'hide'],
                    ['is_reply', '=', 'true'],
                    ['call_type', '=', $user->agent_type == 'Warranty' ? 'CF-Warranty Claim' : 'Parts'],
                ])->get();

                foreach ($cases_due_today as &$value) {
                    $emailDate = Carbon::parse($value->email_date);
                    $dayOfWeek = $emailDate->dayOfWeekIso;

                    // Determine the number of days to add
                    if ($dayOfWeek == 4 || $dayOfWeek == 5) {
                        $addDay = 4;
                    } elseif ($dayOfWeek == 6) {
                        $addDay = 3;
                    } elseif ($dayOfWeek == 7) {
                        $addDay = 2;
                    } else {
                        $addDay = 2;
                    }
                    $value->email_date = $emailDate->addDays($addDay)->format('Y-m-d');
                }
                $cases_due_today = $cases_due_today->filter(function ($ticket) use ($today) {
                    return $ticket->email_date === $today;
                })->count();
                //End due today

                // $overdue_direct_emails = DirectEmail::where('user_id', $user->id)
                //     ->whereRaw('DATE_ADD(updated_at, INTERVAL 4 DAY) <= ?', [$today])
                //     ->count();

                $overdue_direct_emails = DirectEmail::where([['user_id', '=', $user->id], ['isHide', '<>', 'true']])->get();
                foreach ($overdue_direct_emails as &$value) {
                    $emailDate = Carbon::parse($value->email_date);
                    $dayOfWeek = $emailDate->dayOfWeekIso;
                    if ($dayOfWeek == 4 || $dayOfWeek == 5) {
                        $addDay = 4;
                    } elseif ($dayOfWeek == 6) {
                        $addDay = 3;
                    } elseif ($dayOfWeek == 7) {
                        $addDay = 2;
                    } else {
                        $addDay = 2;
                    }
                    $value->email_date = $emailDate->addDays($addDay)->format('Y-m-d');
                }
                $upcoming_dues_direct_emails = $overdue_direct_emails->filter(function ($ticket) use ($today) {
                    return $ticket->email_date > $today;
                })->count();
                $overdue_direct_emails = $overdue_direct_emails->filter(function ($ticket) use ($today) {
                    return $ticket->email_date < $today;
                })->count();


                // $direct_emails_due_today = DirectEmail::where('user_id', $user->id)
                //     ->whereDate(DB::raw('DATE_ADD(updated_at, INTERVAL 2 DAY)'), '=', $today)
                //     ->count();

                $direct_emails_due_today = DirectEmail::where([['user_id', '=', $user->id], ['isHide', '<>', 'true']])->get();
                foreach ($direct_emails_due_today as &$value) {
                    $emailDate = Carbon::parse($value->email_date);
                    $dayOfWeek = $emailDate->dayOfWeekIso;

                    // Determine the number of days to add
                    if ($dayOfWeek == 4 || $dayOfWeek == 5) {
                        $addDay = 4;
                    } elseif ($dayOfWeek == 6) {
                        $addDay = 3;
                    } elseif ($dayOfWeek == 7) {
                        $addDay = 2;
                    } else {
                        $addDay = 2;
                    }
                    $value->email_date = $emailDate->addDays($addDay)->format('Y-m-d');
                }
                $direct_emails_due_today = $direct_emails_due_today->filter(function ($ticket) use ($today) {
                    return $ticket->email_date === $today;
                })->count();



                $handled_cases = CasesLog::where([
                    ['user_id', '=', $user->id],
                    ['log_from', '=', 'handled']
                ])->with(['ticket']);

                if ($request->start == $request->end) {
                    $today = Carbon::parse($request->start)->toDateString();
                    $handled_cases->whereDate('created_at', $today);
                } else if ($request->start && $request->end) {
                    $handled_cases->whereBetween('created_at', [$request->start, $request->end]);
                } else {
                    $today = Carbon::today()->toDateString();
                    $handled_cases->whereDate('created_at', $today);
                }
                $handled_cases_count = $handled_cases->count();
                $handled_cases_notes = $handled_cases;

                $handled_direct_emails = CasesLog::where([
                    ['user_id', '=', $user->id],
                    ['log_from', '=', 'direct_emails']
                ]);
                
                if ($request->start == $request->end) {
                    $today = Carbon::parse($request->start)->toDateString();
                    $handled_direct_emails->whereDate('created_at', $today);
                } else if ($request->start && $request->end) {
                    $handled_direct_emails->whereBetween('created_at', [$request->start, $request->end]);
                } else {
                    $today = Carbon::today()->toDateString();
                    $handled_direct_emails->whereDate('created_at', $today);
                }
                $handled_direct_emails_count = $handled_direct_emails->count();
                $handled_direct_emails_notes = $handled_direct_emails;

                // Add handled_count attribute to the user instance
                $user->handled_cases = $handled_cases_count;
                $user->handled_cases_notes = $handled_cases_notes->get();
                $user->cases_due_today = $cases_due_today;
                $user->overdue_cases = $overdue_cases;
                $user->upcoming_dues = $upcoming_dues;
                $user->upcoming_dues_direct_emails = $upcoming_dues_direct_emails;
                $user->overdue_direct_emails = $overdue_direct_emails;
                $user->direct_emails_due_today = $direct_emails_due_today;
                $user->handled_direct_emails = $handled_direct_emails_count;
                $user->handled_direct_emails_notes = $handled_direct_emails_notes->get();
            }
        }



        return response()->json([
            'data' => $users,
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

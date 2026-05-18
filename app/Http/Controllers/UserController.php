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

        // 1. Define the reusable date filter for CasesLog
        $applyDateFilter = function ($query) use ($request, $today) {
            if ($request->start && $request->end) {
                if ($request->start == $request->end) {
                    $query->whereDate('created_at', Carbon::parse($request->start)->toDateString());
                } else {
                    $query->whereBetween('created_at', [$request->start, $request->end]);
                }
            } else {
                $query->whereDate('created_at', $today);
            }
        };

        // 2. Fetch Users and Eager Load all necessary data at once
        $users = User::where(function ($q) use ($role_id) {
            $q->where('role_id', $role_id)
                ->orWhereIn('role_id', [1, 5])
                // ->whereIn('agent_type', ['Warranty', 'Parts', 'CSR', 'Safety Issue','Admin'])
                ->orderBy('agent_type', 'desc');
        })
            ->with(['role'])
            // Conditionally eager load the heavy data ONLY if role is 5
            ->when($role_id == 5, function ($query) use ($applyDateFilter) {
                $query->with([
                    'tickets' => function ($q) {
                        $q->whereNotNull('ticket_id')
                            ->where('cases_status', '<>', 'hidden')
                            ->where('is_reply', 'true')
                            ->where('ticket_id', '<>', '')
                            ->whereNotNull('email')
                            ->where('created_at', '>=', Carbon::now()->subMonths(11))
                            ->whereYear('created_at', '<>', 2024);
                    },
                    'directEmails' => function ($q) {
                        $q->where('isHide', '<>', 'true')
                            ->whereIn('id', function ($subQuery) {
                                $subQuery->selectRaw('MAX(id)')
                                    ->from('direct_emails')
                                    ->groupBy('threadId');
                            });
                    },
                    'handledCasesLogs' => function ($q) use ($applyDateFilter) {
                        $q->with('ticket'); // nested eager loading
                        $applyDateFilter($q);
                    },
                    'handledDirectEmailsLogs' => function ($q) use ($applyDateFilter) {
                        $q->with('direct_email'); // nested eager loading
                        $applyDateFilter($q);
                    }
                ]);
            })
            ->get();

        // 3. Map the loaded relationships into your specific JSON response format
        if ($role_id == 5) {
            $users->each(function ($user) use ($today) {

                // Tickets - Counting in memory via Collection
                $user->cases_due_today = $user->tickets->where('email_date', $today)->count();
                $user->overdue_cases   = $user->tickets->where('email_date', '<', $today)->count();
                $user->upcoming_dues   = $user->tickets->where('email_date', '>', $today)->count();

                // Direct Emails - Counting in memory via Collection
                $user->direct_emails_due_today     = $user->directEmails->where('email_date', $today)->count();
                $user->overdue_direct_emails       = $user->directEmails->where('email_date', '<', $today)->count();
                $user->upcoming_dues_direct_emails = $user->directEmails->where('email_date', '>', $today)->count();

                // Handled Cases
                $user->handled_cases       = $user->handledCasesLogs->count();
                $user->handled_cases_notes = $user->handledCasesLogs; // Assigning the collection

                // Handled Direct Emails
                $user->handled_direct_emails       = $user->handledDirectEmailsLogs->count();
                $user->handled_direct_emails_notes = $user->handledDirectEmailsLogs; // Assigning the collection

                // Optional: Unset the base relationship properties so your JSON payload 
                // exactly matches your original structure without duplicated data arrays.
                unset($user->tickets);
                unset($user->directEmails);
                unset($user->handledCasesLogs);
                unset($user->handledDirectEmailsLogs);
            });
        }

        return response()->json(['data' => $users], 200);
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

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

        // Get all users (role_id OR admin)
        $users = User::where(function ($q) use ($role_id) {
            $q->where('role_id', $role_id)
                ->orWhere('role_id', 1)
                ->whereIn('agent_type', ['Warranty', 'Parts']);
        })
            ->with('role')
            ->get();

        if ($role_id == 5) {
            foreach ($users as $user) {
                // --------------------------
                // Helper: adjust email_date
                // --------------------------
                $adjustDate = function ($date) {
                    $emailDate = Carbon::parse($date);
                    $dayOfWeek = $emailDate->dayOfWeekIso;

                    return $emailDate->addDays(
                        in_array($dayOfWeek, [4, 5]) ? 4 : ($dayOfWeek == 6 ? 3 : 2)
                    )->toDateString();
                };

                // --------------------------
                // Tickets
                // --------------------------
                $tickets = Ticket::where('user_id', $user->id)
                    ->whereNotNull('ticket_id')
                    ->where('cases_status', '<>', 'hidden')
                    ->where('is_reply', 'true')
                    ->where('status', '<>', 'CLOSED')
                    // ->where('call_type', $user->agent_type === 'Warranty'
                    //     ? 'CF-Warranty Claim'
                    //     : 'Parts')
                    ->where('created_at', '>=', Carbon::now()->subMonths(4))
                    ->get()
                    ->map(function ($t) use ($adjustDate) {
                        $t->email_date = $adjustDate($t->email_date);
                        return $t;
                    });

                $user->cases_due_today = $tickets->where('email_date', $today)->count();
                $user->overdue_cases   = $tickets->where('email_date', '<', $today)->count();
                $user->upcoming_dues   = $tickets->where('email_date', '>', $today)->count();

                // --------------------------
                // Direct Emails
                // --------------------------
                $directEmails = DirectEmail::where('user_id', $user->id)
                    ->where('isHide', '<>', 'true')
                    ->get()
                    ->map(function ($d) use ($adjustDate) {
                        $d->email_date = $adjustDate($d->email_date);
                        return $d;
                    });

                $user->direct_emails_due_today    = $directEmails->where('email_date', $today)->count();
                $user->overdue_direct_emails      = $directEmails->where('email_date', '<', $today)->count();
                $user->upcoming_dues_direct_emails = $directEmails->where('email_date', '>', $today)->count();

                // --------------------------
                // Handled Cases
                // --------------------------
                $handledCases = CasesLog::where('user_id', $user->id)
                    ->where('log_from', 'handled')
                    ->with('ticket');

                $handledDirect = CasesLog::where('user_id', $user->id)
                    ->where('log_from', 'direct_emails')
                    ->with('direct_email');

                if ($request->start && $request->end) {
                    if ($request->start == $request->end) {
                        $date = Carbon::parse($request->start)->toDateString();
                        $handledCases->whereDate('created_at', $date);
                        $handledDirect->whereDate('created_at', $date);
                    } else {
                        $handledCases->whereBetween('created_at', [$request->start, $request->end]);
                        $handledDirect->whereBetween('created_at', [$request->start, $request->end]);
                    }
                } else {
                    $handledCases->whereDate('created_at', $today);
                    $handledDirect->whereDate('created_at', $today);
                }

                $user->handled_cases              = $handledCases->count();
                $user->handled_cases_notes        = $handledCases->get();
                $user->handled_direct_emails      = $handledDirect->count();
                $user->handled_direct_emails_notes = $handledDirect->get();
            }
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

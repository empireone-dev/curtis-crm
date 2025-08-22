<?php

namespace App\Http\Controllers;

use App\Models\Recall;
use App\Models\RecallLog;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RecallLogController extends Controller
{

    public function get_recall_unread_email()
    {

        $today = Carbon::today()->toDateString();
        $recalls = Recall::where('isHide', '=', 'false')->get();
        $handled_cases = RecallLog::where('log_from', 'recalls')
            ->whereDate('created_at', $today)
            ->get();

        foreach ($recalls as &$value) {
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

        $upcoming_cases = $recalls->filter(function ($recall) use ($today) {
            return $recall->email_date > $today;
        })->count();
        $over_due = $recalls->filter(function ($recall) use ($today) {
            return $recall->email_date < $today;
        })->count();
        $due_today = $recalls->filter(function ($recall) use ($today) {
            return $recall->email_date == $today;
        })->count();


        return response()->json([
            'upcoming_cases' => $upcoming_cases,
            'over_due' => $over_due,
            'due_today' => $due_today,
            'handled_cases' => $handled_cases->count(),
        ], 200);
    }
    public function store(Request $request)
    {
       
        $data = $request->all();
        $recall = Recall::where('id', $data['recall_id'])->first();
        if ($recall) {
            $recall->update(['isHide' => 'true']);
        }
        $recallLog = RecallLog::create($data);
        return response()->json($recallLog, 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Recall;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RecallController extends Controller
{
    public function index(Request $request)
    {
        $today = Carbon::today()->toDateString();
        $recalls = Recall::where('isHide', '<>', 'true')->orderBy('id', 'desc')->get();
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

        if ($request->cases == "upcoming_cases") {
            $result = $recalls->filter(function ($recall) use ($today) {
                return $recall->email_date > $today;
            });
        }
        if ($request->cases == "over_due") {
            $result = $recalls->filter(function ($recall) use ($today) {
                return $recall->email_date < $today;
            });
        }

        if ($request->cases == "due_today") {
            $result = $recalls->filter(function ($recall) use ($today) {
                return $recall->email_date == $today;
            });
        }


        return response()->json($result, 200);
    }

    public function show($id)
    {
        $recall = Recall::where('id', $id)->with(['logs', 'user'])->first();
        // Logic to retrieve and return a specific recall
        return response()->json($recall, 200);
    }
}

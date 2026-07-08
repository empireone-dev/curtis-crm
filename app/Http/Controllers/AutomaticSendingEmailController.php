<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AutomaticSendingEmailController extends Controller
{
    public function send_lacking_information_notification()
    {
        $tickets = Ticket::whereDate('created_at', Carbon::now()->subDays(3)->toDateString())
            ->doesntHave('files')
            ->get();

        return response()->json([
            'status' => 'success',
            'count'=>count( $tickets),
            'data' => $tickets
        ], 200);
    }
}

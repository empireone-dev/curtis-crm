<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AutomaticSendingEmailController extends Controller
{
    public function send_lacking_information_notification()
    {
        // Corrected query chain
        $tickets = Ticket::whereDate('created_at', Carbon::now()->subDays(3)->toDateString())
            ->where('call_type', 'CF-Warranty Claim')
            ->doesntHave('files')
            ->get();

        return response()->json([
            'status' => 'success',
            'count'  => $tickets->count(), // Using Eloquent collection's count() method is cleaner
            'data'   => $tickets
        ], 200);
    }
}

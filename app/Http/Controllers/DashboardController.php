<?php

namespace App\Http\Controllers;

use App\Models\DecisionMaking;
use App\Models\Ticket;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function agent_dashboard($userid)
    {
        $parts_validation = Ticket::where([['user_id', '=', $userid], ['status', '=', 'PARTS VALIDATION']])->count();

        $validation = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'WARRANTY VALIDATION']
        ])->count();

        $parts = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'Parts'],
            ['isUploading', '=', 'true'],
            ['status', '=', 'PARTS VALIDATION']
        ])->count();

        $resource = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'CF-Warranty Claim'],
            ['isUploading', '=', 'true'],
            ['status', '=', 'RESOURCE'],
        ])->count();

        $refund = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'REFUND'],
            ['isUploading', '=', 'true'],
        ])->count();

        $replacement_parts = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'Parts'],
            ['status', '=', 'REPLACEMENT PARTS'],
            ['isUploading', '=', 'true'],
        ])->count();


        $replacement = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'REPLACEMENT'],
            ['isUploading', '=', 'true'],
        ])->count();


        $internals = Ticket::where([
            ['user_id', '=', $userid],
            ['status', '=', 'INTERNALS'],
            ['isUploading', '=', 'true'],
        ])->count();

        $repair = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'REPAIR'],
            ['isUploading', '=', 'true'],
        ])->count();

        $callback = Ticket::where([
            ['user_id', '=', $userid],
            ['status', '=', 'CALLBACK'],
            ['isUploading', '=', 'true'],
        ])->count();


        $technical = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'TS-Tech Support'],
            ['status', '=', 'TECH VALIDATION'],
            ['isUploading', '=', 'false'],
        ])->count();

        $waiting_photos = Ticket::where([
            ['isUploading', '=', null],
            ['user_id', '=', $userid]
        ])->count();

        $warehouse_us = Ticket::where([
            ['user_id', '=', $userid],
            ['country', '=', 'US'],
            ['status', '=', 'US WAREHOUSE']
        ])->count();
        $warehouse_ca = Ticket::where([
            ['user_id', '=', $userid],
            ['country', '=', 'CA'],
            ['status', '=', 'CA WAREHOUSE']
        ])->count();

        $closed = Ticket::where([
            ['status', '=', 'CLOSED'],
            ['user_id', '=', $userid],
        ])->count();
        $check_availability = Ticket::where([
            ['status', '=', 'INTERNALS'],
            ['user_id', '=', $userid],
        ])->count();
        $updates_curtis = Ticket::where([
            ['status', '=', 'AVAILABILITY'],
            ['user_id', '=', $userid],
        ])->count();

        $web_form = Ticket::where([
            ['isUploading', '=', 'true'],
            ['created_from', '=', 'WEB FORM'],
            ['user_id', '=', $userid],
            ])->count();

        $process_ticket = Ticket::where([
            ['isUploading', '=', 'true'],
            ['status', '=', 'PROCESSED TICKET'],
            ['user_id', '=', $userid],
        ])->count();

        return response()->json([
            'validation' => $validation,
            'parts_validation' => $parts_validation,
            'resource' => $resource,
            'parts' => $parts,
            'replacement_parts' => $replacement_parts,
            'replacement' => $replacement,
            'internals' => $internals,
            'repair' => $repair,
            'refund' => $refund,
            'callback' => $callback,
            'technical' => $technical,
            'waiting_photos' => $waiting_photos,
            'warehouse_us' => $warehouse_us,
            'warehouse_ca' => $warehouse_ca,
            'closed' => $closed,
            'check_availability' => $check_availability,
            'updates_curtis' => $updates_curtis,
            'web_form'=>$web_form,
            'process_ticket'=>$process_ticket
        ], 200);
    }
    public function asc_dashboard($id)
    {

        $assigned = Ticket::where([['asc_id', '=', $id], ['decision_status', '=', 'REPAIR']])->count();
        $repaired = Ticket::where([['asc_id', '=', $id], ['decision_status', '=', 'REPAIRED']])->count();
        $notrepaired = Ticket::where([['asc_id', '=', $id], ['decision_status', '=', 'NOT REPAIRED']])->count();

        return response()->json([
            'assigned' => $assigned,
            'repaired' => $repaired,
            'notrepaired' => $notrepaired,
        ], 200);
    }

    public function warehouse_dashboard($country)
    {
        $tickets = Ticket::where([
            ['country', '=', $country],
            ['status', '=', $country == 'CA' ? 'CA WAREHOUSE' : 'US WAREHOUSE']
        ])->count();

        return response()->json([
            'assigned' => $tickets,
        ], 200);
    }
    public function administrator_dashboard()
    {

        $parts_validation = Ticket::where('status', '=', 'PARTS VALIDATION')->count();

        $validation = Ticket::where([
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'WARRANTY VALIDATION']
        ])->count();

        $parts = Ticket::where([
            ['call_type', '=', 'Parts'],
            ['isUploading', '=', 'true'],
            ['status', '=', 'PARTS VALIDATION']
        ])->count();

        $resource = Ticket::where([
            ['call_type', '=', 'CF-Warranty Claim'],
            ['isUploading', '=', 'true'],
            ['status', '=', 'RESOURCE'],
        ])->count();

        $refund = Ticket::where([
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'REFUND'],
            ['isUploading', '=', 'true'],
        ])->count();

        $replacement_parts = Ticket::where([
            ['call_type', '=', 'Parts'],
            ['status', '=', 'REPLACEMENT PARTS'],
            ['isUploading', '=', 'true'],
        ])->count();


        $replacement = Ticket::where([
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'REPLACEMENT'],
            ['isUploading', '=', 'true'],
        ])->count();


        $internals = Ticket::where([
            ['status', '=', 'INTERNALS'],
            ['isUploading', '=', 'true'],
        ])->count();

        $repair = Ticket::where([
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'REPAIR'],
            ['isUploading', '=', 'true'],
        ])->count();

        $callback = Ticket::where([
            ['status', '=', 'CALLBACK'],
            ['isUploading', '=', 'true'],
        ])->count();


        $technical = Ticket::where([
            ['call_type', '=', 'TS-Tech Support'],
            ['status', '=', 'TECH VALIDATION'],
            ['isUploading', '=', 'false'],
        ])->count();

        $waiting_photos = Ticket::where('isUploading', '=', null)->count();

        $warehouse_us = Ticket::where([
            ['country', '=', 'US'],
            ['status', '=', 'US WAREHOUSE']
        ])->count();

        $web_form = Ticket::where([
            ['isUploading', '=', 'true'],
            ['created_from', '=', 'WEB FORM']
            ])->count();

        $process_ticket = Ticket::where([
            ['isUploading', '=', 'true'],
            ['status', '=', 'PROCESSED TICKET']
        ])->count();
        
        $warehouse_ca = Ticket::where([
            ['country', '=', 'CA'],
            ['status', '=', 'CA WAREHOUSE']
        ])->count();

        $closed = Ticket::where('status', '=', 'CLOSED')->count();
        $check_availability = Ticket::where('status', '=', 'INTERNALS')->count();
        $updates_curtis = Ticket::where('status', '=', 'AVAILABILITY')->count();

        return response()->json([
            'validation' => $validation,
            'parts_validation' => $parts_validation,
            'resource' => $resource,
            'parts' => $parts,
            'replacement_parts' => $replacement_parts,
            'replacement' => $replacement,
            'internals' => $internals,
            'repair' => $repair,
            'refund' => $refund,
            'callback' => $callback,
            'technical' => $technical,
            'waiting_photos' => $waiting_photos,
            'warehouse_us' => $warehouse_us,
            'warehouse_ca' => $warehouse_ca,
            'closed' => $closed,
            'check_availability' => $check_availability,
            'updates_curtis' => $updates_curtis,
            'web_form' => $web_form,
            'process_ticket'=>$process_ticket
        ], 200);
    }

    public function customer_dashboard($userid)
    {
        $pending = Ticket::where([['user_id', '=', $userid], ['isUploading', '=', 'false']])->count();
        $closed = Ticket::where([['user_id', '=', $userid], ['status', '=', 'CLOSED']])->count();
        $process = Ticket::where([['user_id', '=', $userid], ['isUploading', '=', 'true'], ['status', '<>', 'PARTS VALIDATION']])
            ->Where([['user_id', '=', $userid], ['isUploading', '=', 'true'], ['status', '<>', 'WARRANTY VALIDATION']])
            ->Where([['user_id', '=', $userid], ['isUploading', '=', 'true'], ['status', '<>', 'TECH VALIDATION']])
            ->Where([['user_id', '=', $userid], ['isUploading', '=', 'true'], ['status', '<>', 'CLOSED']])->count();

        return response()->json([
            'pending' => $pending,
            'process' => $process,
            'closed' => $closed,
        ], 200);
    }
}

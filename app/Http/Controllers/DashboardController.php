<?php

namespace App\Http\Controllers;

use App\Models\DecisionMaking;
use App\Models\Ticket;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function agent_dashboard($userid)
    {

        $open_warranty = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'CF-Warranty Claim'],
            ['isUploading', '=', 'false'],
            ['status', '=', 'WARRANTY VALIDATION']
        ])->count();

        $open_parts = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'Parts'],
            // ['isUploading', '=', 'false'],
            ['status', '=', 'PARTS VALIDATION']
        ])->count();

        $open_tech = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'TS-Tech Support'],
            ['isUploading', '=', 'false'],
            ['status', '=', 'TECH VALIDATION']
        ])->count();

        $warranty_validation = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'WARRANTY VALIDATION']
        ])->count();

        $parts_validation = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'Parts'],
            ['status', '=', 'PARTS VALIDATION']
        ])->count();

        $warranty_process_ticket = Ticket::where([
            ['call_type', '=', 'CF-Warranty Claim'],
            ['where_status', '=', 'PROCESSED TICKET'],
            ['user_id', '=', $userid],
        ])->count();

        $warranty_closed = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'CLOSED']
        ])->count();

        $parts_closed = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'Parts'],
            ['status', '=', 'CLOSED']
        ])->count();

        $parts_process_ticket = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'Parts'],
            ['where_status', '=', 'PARTS PROCESSED TICKET'],
        ])->count();


        $tech_closed = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'TS-Tech Support'],
            ['status', '=', 'CLOSED']
        ])->count();

        $resource = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'RESOURCE'],
        ])->count();

        $refund = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'REFUND'],
        ])->count();

        $replacement_parts = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'Parts'],
            ['status', '=', 'REPLACEMENT PARTS'],
        ])->count();


        $replacement = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'REPLACEMENT'],
        ])->count();


        $internals = Ticket::where([
            ['user_id', '=', $userid],
            ['status', '=', 'INTERNALS'],
        ])->count();

        $repair = Ticket::where([
            ['user_id', '=', $userid],
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'REPAIR'],
        ])->count();

        $callback = Ticket::where([
            ['user_id', '=', $userid],
            ['status', '=', 'CALLBACK'],
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


        $check_availability = Ticket::where([
            ['status', '=', 'INTERNALS'],
            ['user_id', '=', $userid],
        ])->count();
        $updates_curtis = Ticket::where([
            ['status', '=', 'AVAILABILITY'],
            ['user_id', '=', $userid],
        ])->count();

        $web_form = Ticket::where([
            ['created_from', '=', 'WEB FORM'],
            ['user_id', '=', $userid],
        ])->count();

        $waiting_for_photos = Ticket::where([
            ['status', '=', 'WAITING FOR PHOTOS'],
            ['user_id', '=', $userid],
        ])->count();

        $repair_success = Ticket::where([
            ['status', '=', 'REPAIR SUCCESS'],
            ['user_id', '=', $userid],
        ])->count();
        $repair_unsuccessful = Ticket::where([
            ['status', '=', 'REPAIR UNSUCCESSFUL'],
            ['user_id', '=', $userid],
        ])->count();


        $rma_request = Ticket::where('status', '=', 'RMA REQUEST')->count();

        return response()->json([
            'repair_unsuccessful' => $repair_unsuccessful,
            'repair_success' => $repair_success,
            'waiting_for_photos' => $waiting_for_photos,
            'open_warranty' => $open_warranty,
            'open_parts' => $open_parts,
            'open_tech' => $open_tech,
            'warranty_validation' => $warranty_validation,
            'parts_validation' => $parts_validation,
            'resource' => $resource,
            'parts_validation' => $parts_validation,
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
            'warranty_closed' => $warranty_closed,
            'parts_closed' => $parts_closed,
            'tech_closed' => $tech_closed,
            'check_availability' => $check_availability,
            'updates_curtis' => $updates_curtis,
            'web_form' => $web_form,
            'warranty_process_ticket' => $warranty_process_ticket,
            'parts_process_ticket' => $parts_process_ticket,
            'rma_request' => $rma_request
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

        $open_warranty = Ticket::where([
            ['call_type', '=', 'CF-Warranty Claim'],
            ['isUploading', '=', 'false'],
            ['status', '=', 'WARRANTY VALIDATION']
        ])->count();

        $open_parts = Ticket::where([
            ['call_type', '=', 'Parts'],
            // ['isUploading', '=', 'false'],
            ['status', '=', 'PARTS VALIDATION']
        ])->count();

        $open_tech = Ticket::where([
            ['call_type', '=', 'TS-Tech Support'],
            ['isUploading', '=', 'false'],
            ['status', '=', 'TECH VALIDATION']
        ])->count();

        $parts_validation = Ticket::where([
            ['call_type', '=', 'Parts'],
            ['status', '=', 'PARTS VALIDATION']
        ])->count();

        $warranty_validation = Ticket::where([
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'WARRANTY VALIDATION']
        ])->count();

        $warranty_closed = Ticket::where([
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'CLOSED']
        ])->count();

        $parts = Ticket::where([
            ['call_type', '=', 'Parts'],
            ['status', '=', 'PARTS VALIDATION']
        ])->count();

        $resource = Ticket::where([
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'RESOURCE'],
        ])->count();

        $refund = Ticket::where([
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'REFUND'],
        ])->count();

        $replacement_parts = Ticket::where([
            ['call_type', '=', 'Parts'],
            ['status', '=', 'REPLACEMENT PARTS'],
        ])->count();


        $replacement = Ticket::where([
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'REPLACEMENT'],
        ])->count();


        $internals = Ticket::where([
            ['status', '=', 'INTERNALS'],
        ])->count();

        $repair = Ticket::where([
            ['call_type', '=', 'CF-Warranty Claim'],
            ['status', '=', 'REPAIR'],
        ])->count();

        $callback = Ticket::where([
            ['status', '=', 'CALLBACK'],
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
            ['created_from', '=', 'WEB FORM']
        ])->count();

        $warranty_process_ticket = Ticket::where([
            ['call_type', '=', 'CF-Warranty Claim'],
            ['where_status', '=', 'PROCESSED TICKET'],
        ])->count();

        $parts_process_ticket = Ticket::where([
            ['call_type', '=', 'Parts'],
            ['where_status', '=', 'PARTS PROCESSED TICKET'],
        ])->count();

        $warehouse_ca = Ticket::where([
            ['country', '=', 'CA'],
            ['status', '=', 'CA WAREHOUSE']
        ])->count();

        $tech_closed = Ticket::where([
            ['call_type', '=', 'TS-Tech Support'],
            ['status', '=', 'CLOSED']
        ])->count();

        $parts_closed = Ticket::where([
            ['call_type', '=', 'Parts'],
            ['status', '=', 'CLOSED']
        ])->count();

        $rma_issued = Ticket::where([
            ['status', '=', 'RMA ISSUED']
        ])->count();

        $repair_unsuccessful = Ticket::where('status', '=', 'REPAIR UNSUCCESSFUL')->count();
        $repair_success = Ticket::where('status', '=', 'REPAIR SUCCESS')->count();

        $waiting_for_photos =  Ticket::where('status', '=', 'WAITING FOR PHOTOS')->count();

        $check_availability = Ticket::where('status', '=', 'INTERNALS')->count();
        $updates_curtis = Ticket::where('status', '=', 'AVAILABILITY')->count();
        $rma_request = Ticket::where('status', '=', 'RMA REQUEST')->count();

        return response()->json([
            'repair_unsuccessful' => $repair_unsuccessful,
            'repair_success' => $repair_success,
            'waiting_for_photos' => $waiting_for_photos,
            'open_warranty' => $open_warranty,
            'open_parts' => $open_parts,
            'open_tech' => $open_tech,
            'warranty_validation' => $warranty_validation,
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
            'tech_closed' => $tech_closed,
            'warranty_closed' => $warranty_closed,
            'parts_closed' => $parts_closed,
            'check_availability' => $check_availability,
            'updates_curtis' => $updates_curtis,
            'web_form' => $web_form,
            'warranty_process_ticket' => $warranty_process_ticket,
            'parts_process_ticket' => $parts_process_ticket,
            'rma_request' => $rma_request,
            'rma_issued' => $rma_issued
        ], 200);
    }

    public function customer_dashboard($userid)
    {
        $pending = Ticket::where([['user_id', '=', $userid], ['isUploading', '=', 'false']])->count();
        $closed = Ticket::where([['user_id', '=', $userid], ['status', '=', 'CLOSED']])->count();
        $process = Ticket::where([['user_id', '=', $userid], ['status', '<>', 'PARTS VALIDATION']])
            ->Where([['user_id', '=', $userid], ['status', '<>', 'WARRANTY VALIDATION']])
            ->Where([['user_id', '=', $userid], ['status', '<>', 'TECH VALIDATION']])
            ->Where([['user_id', '=', $userid], ['status', '<>', 'CLOSED']])->count();

        return response()->json([
            'pending' => $pending,
            'process' => $process,
            'closed' => $closed,
        ], 200);
    }
}

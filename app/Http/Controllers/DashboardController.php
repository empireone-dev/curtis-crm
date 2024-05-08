<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
  public function administrator_dashboard(){

    $parts_validation = Ticket::where('status','=','PARTS VALIDATION')->count();

    $validation = Ticket::where([
        ['call_type','=','CF-Warranty Claim'],
        ['status','=','WARRANTY VALIDATION']
    ])->count();

    $parts = Ticket::where([
        ['call_type','=','Parts'],
        ['isUploading','=','true'],
        ['status','=','PARTS VALIDATION']
    ])->count();

    $resource = Ticket::where([
        ['call_type','=','CF-Warranty Claim'],
        ['isUploading','=','true'],
        ['status','=','RESOURCE'],
    ])->count();

    $refund = Ticket::where([
        ['call_type','=','CF-Warranty Claim'],
        ['status','=','REFUND'],
        ['isUploading','=','true'],
    ])->count();

    $replacement_parts = Ticket::where([
        ['call_type','=','Parts'],
        ['status','=','REPLACEMENT PARTS'],
        ['isUploading','=','true'],
    ])->count();


    $replacement = Ticket::where([
        ['call_type','=','CF-Warranty Claim'],
        ['status','=','REPLACEMENT'],
        ['isUploading','=','true'],
    ])->count();
    

    $internals = Ticket::where([
        ['status','=','INTERNALS'],
        ['isUploading','=','true'],
    ])->count();

    $repair = Ticket::where([
        ['call_type','=','CF-Warranty Claim'],
        ['status','=','REPAIR'],
        ['isUploading','=','true'],
    ])->count();

    $callback = Ticket::where([
        ['status','=','CALLBACK'],
        ['isUploading','=','true'],
    ])->count();

    
    $technical = Ticket::where([
        ['call_type','=','TS-Tech Support'],
        ['status','=','TECH VALIDATION'],
        ['isUploading','=','false'],
    ])->count();

    $waiting_photos = Ticket::where('isUploading','=',null)->count();

    $warehouse_us = Ticket::where([
        ['country','=','US'],
        ['status','=','US WAREHOUSE']
    ])->count();
    $warehouse_ca = Ticket::where([
        ['country','=','CA'],
        ['status','=','CA WAREHOUSE']
    ])->count();

    $closed = Ticket::where('status','=','CLOSED')->count();
    $check_availability = Ticket::where('status','=','INTERNALS')->count();
    $updates_curtis = Ticket::where('status','=','AVAILABILITY')->count();

    return response()->json([
        'validation'=>$validation,
        'parts_validation' => $parts_validation,
        'resource'=>$resource,
        'parts' => $parts,
        'replacement_parts' => $replacement_parts,
        'replacement'=>$replacement,
        'internals'=>$internals,
        'repair'=>$repair,
        'refund'=>$refund,
        'callback'=> $callback,
        'technical' => $technical,
        'waiting_photos'=>$waiting_photos,
        'warehouse_us'=>$warehouse_us,
        'warehouse_ca'=>$warehouse_ca,
        'closed'=>$closed,
        'check_availability'=>$check_availability,
        'updates_curtis'=>$updates_curtis
    ], 200);
  }
}

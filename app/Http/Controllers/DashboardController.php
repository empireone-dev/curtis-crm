<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
  public function administrator_dashboard(){
    $parts_validation = Ticket::where('status','=','PARTS VALIDATION')->count();
    $parts = Ticket::where([
        ['call_type','=','Parts'],
        ['status','=',null]
    ])->count();
    $technical = Ticket::where([
        ['call_type','=','TS-Tech Support'],
        ['status','=',null],
        ['isUploading','=','false'],
    ])->count();
    $waiting_photos = Ticket::where('isUploading','=',null)->count();
    $warehouse_us = Ticket::where([
        ['country','=','US'],
        ['status','=','WAREHOUSE']
    ])->count();
    $warehouse_ca = Ticket::where([
        ['country','=','CA'],
        ['status','=','WAREHOUSE']
    ])->count();
    $closed = Ticket::where('status','=','CLOSED')->count();
    $check_availability = Ticket::where('status','=','INTERNALS')->count();
    $updates_curtis = Ticket::where('status','=','AVAILABILITY')->count();

    return response()->json([
        'parts_validation' => $parts_validation,
        'parts' => $parts,
        'technical' => $technical,
        'waiting_photos'=>$waiting_photos,
        'warehouse_us'=>$warehouse_us,
        'warehouse_ca'=>$warehouse_ca,
        'closed'=>$closed,
        'check_availability'=>$check_availability,
        'updates_curtis'=>$updates_curtis
    ], 404);
  }
}

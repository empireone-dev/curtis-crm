<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    public function update(Request $request,$id)
    {
        Flight::where('id',$id)->update([
            'email' => $request->email
        ]);
        return 'success';
    }
    public function store(Request $request)
    {
        Flight::create([
            'email' => $request->email
        ]);
        return 'success';
    }
    public function show($id)
    {
        // Flight::where('id',$id)->delete();
        return 'success';
    }
}

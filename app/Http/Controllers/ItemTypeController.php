<?php

namespace App\Http\Controllers;

use App\Models\ItemType;
use Illuminate\Http\Request;

class ItemTypeController extends Controller
{
    public function index(){
        $item_type = ItemType::get();
        return response()->json([
            'data' => $item_type
        ], 200);
    }
    public function store(Request $request)
    {
        // Role::create($request->validate([
        //     'name' => 'required|unique:permission',
        //     'details' => 'required',
        //     'start' => 'required',
        //     'due' => 'required',
        //     'status' => 'required'
        // ]));
        // return response()->json([
        //     'status' => 'success',
        //    'data'=>$this->index()->original['data']
        // ], 200);
    }
}

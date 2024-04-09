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

    public function destroy($id)
    {
        $item_type = ItemType::find($id);
        if (!$item_type) {
            return response()->json([
                'status' => 'error',
                'message' => 'item_type not found'
            ], 404);
        }
    
        $item_type->delete();
    
        $item_types = ItemType::get();
        return response()->json([
            'status' => 'success',
            'data' => $item_types
        ], 200);
    }

    public function update(Request $request, $id){
        $item_type = ItemType::find($id);
        $item_type->update($request->all());

        return response()->json([
            'data' => $this->index()->original['data']
        ], 200);
    }
}

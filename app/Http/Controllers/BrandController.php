<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index(){
        $brand = Brand::get();
        return response()->json([
            'data' => $brand
        ], 200);
    }
    public function store(Request $request)
    {
        // Role::create($request->validate([
        //     'name' => 'required|unique:brand',
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
        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json([
                'status' => 'error',
                'message' => 'brand not found'
            ], 404);
        }
    
        $brand->delete();
    
        $brands = brand::get();
        return response()->json([
            'status' => 'success',
            'data' => $brands
        ], 200);
    }

    public function update(Request $request, $id){
        $brand = Brand::find($id);
        $brand->update($request->all());

        return response()->json([
            'data' => $this->index()->original['data']
        ], 200);
    }
}

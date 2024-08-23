<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\ProductRegistration;
use App\Models\ProductRegistrationFile;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class ProductRegistrationController extends Controller
{
    public function index(Request $request)
    {
        $searchQuery = $request->input('search');

        // Get all column names of the table
        $columns = Schema::getColumnListing('tickets');

        // Start the query builder
        $query = ProductRegistration::query()->with(['prf']);
        if ($searchQuery) {
            // Dynamically add where conditions for each column
            $query->where(function ($query) use ($columns, $searchQuery) {
                // foreach ($columns as $column) {
                //     if ($searchQuery == 'WARRANTY VALIDATION') {
                //         $query->orWhere($column, '=',  $searchQuery);
                //     } else if ($searchQuery == 'OPEN WARRANTY') {
                //         $query->orWhere([['call_type', '=', 'CF-Warranty Claim'], ['status', '=', 'WARRANTY VALIDATION']]);
                //     } else if ($searchQuery == 'REFUND') {
                //         $query->orWhere([['call_type', '=', 'CF-Warranty Claim'], ['status', '=', 'REFUND']]);
                //     } else if ($searchQuery == 'REPLACEMENT') {
                //         $query->orWhere([['call_type', '=', 'CF-Warranty Claim'], ['status', '=', 'REPLACEMENT']]);
                //     } else if ($searchQuery == 'OPEN PARTS') {
                //         $query->orWhere([['call_type', '=', 'Parts'], ['status', '=', 'PARTS VALIDATION']]);
                //     } else if ($searchQuery == 'OPEN TECH') {
                //         $query->orWhere([['call_type', '=', 'TS-Tech Support'], ['status', '=', 'TECH VALIDATION']]);
                //     } else if ($searchQuery == 'WARRANTY CLOSED') {
                //         $query->orWhere([['call_type', '=', 'CF-Warranty Claim'], ['status', '=', 'CLOSED']]);
                //     } else if ($searchQuery == 'PARTS CLOSED') {
                //         $query->orWhere([['call_type', '=', 'Parts'], ['status', '=', 'CLOSED']]);
                //     } else if ($searchQuery == 'TECH CLOSED') {
                //         $query->orWhere([['call_type', '=', 'TS-Tech Support'], ['status', '=', 'CLOSED']]);
                //     } else {
                //         $query->orWhere([[$column, '=',  $searchQuery]]);
                //     }
                // }
                $query->orWhere('id', '=', $searchQuery);
                $query->orWhereRaw('REGEXP_REPLACE(phone, "[^0-9]", "") = ?', [$searchQuery]);
            });
        }

        if ($request->start && $request->end) {
            $startTime = Carbon::createFromFormat('Y-m-d', $request->start)->startOfDay();
            $endTime = Carbon::createFromFormat('Y-m-d', $request->end)->endOfDay();
            $query->whereBetween('created_at', [$startTime, $endTime]);
        }

        // Add item_number condition if provided
        // if ($request->model && ($request->model != 'null' && $request->model != 'undefined')) {
        //     $models = explode(',', $request->model);
        //     $query->whereIn('item_number', $models);
        // }
        // if ($request->call_type  && ($request->call_type != 'null' && $request->call_type != 'undefined')) {
        //     $query->where('call_type', '=', $request->call_type);
        // }
        // if ($request->status  && ($request->status != 'null' && $request->status != 'undefined')) {
        //     $query->where('status', '=', $request->status);
        // }

        // if ($request->status == 'WEB FORM') {
        //     $query->orWhere('created_from', '=', $request->status);
        // }
        // if ($request->status == 'AGENT FORM') {
        //     $query->orWhere('created_from', '=', $request->status);
        // }

        // $query->orderBy('is_reply', 'desc')
        //     ->orderBy('email_date', 'asc')
        //     ->orderByRaw("CASE WHEN status = 'CLOSED' THEN 1 ELSE 0 END ASC")
        //     ->orderBy('status', 'asc');
        $query->orderBy('updated_at', 'desc');
        $data = $query->paginate(10);

        return response()->json([
            'data' => $data ?? [],
        ], 200);
    }

    public function show($id){
        $pr = ProductRegistration::where('id',$id)->with('prf')->first();
        return response()->json([
            'result' => $pr ?? [],
        ], 200);
    }
    public function store(Request $request)
    {
        $pr = ProductRegistration::create([
            'address1' => $request->address1,
            'address2' => $request->address2,
            'city' => $request->city,
            'country' => $request->country,
            'email' => $request->email,
            'fname' => $request->fname,
            'lname' => $request->lname,
            'model' => $request->model,
            'phone' => $request->phone,
            'serial' => $request->serial,
            'state' => $request->state,
            'zipcode' => $request->zipcode
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $uploadedFile) {
                $path = $uploadedFile->store(date("Y"), 's3');
                $url = Storage::disk('s3')->url($path);
                ProductRegistrationFile::create([
                    'pr_id' => $pr->id,
                    'url' => $url,
                ]);
            }
        }
    }
}

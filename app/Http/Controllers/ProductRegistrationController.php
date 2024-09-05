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
    public function get_product_registration($serial)
    {
        $pr = ProductRegistration::where('serial', $serial)->first();
        return response()->json([
            'data' => $pr ?? [],
        ], 200);
    }
    public function index(Request $request)
    {
        $fname = $request->input('fname');
        $lname = $request->input('lname');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $serial = $request->input('serial');
        $model = $request->input('model');

        // Get all column names of the table
        $columns = Schema::getColumnListing('tickets');

        // Start the query builder
        $query = ProductRegistration::query()->with(['prf', 'ticket']);
        if ($fname) {
            $query->where(function ($query) use ($columns, $fname) {
                $query->where('fname', '=', $fname);
            });
        } else if ($lname) {
            $query->where(function ($query) use ($columns, $lname) {
                $query->where('lname', '=', $lname);
            });
        } else if ($email) {
            $query->where(function ($query) use ($columns, $email) {
                $query->where('email', '=', $email);
            });
        } else if ($phone) {
            $query->where(function ($query) use ($columns, $phone) {
                $query->where('phone', '=', $phone);
            });
        } else if ($serial) {
            $query->where(function ($query) use ($columns, $serial) {
                $query->where('serial', '=', $serial);
            });
        } else if ($model) {
            $query->where(function ($query) use ($columns, $model) {
                $query->where('model', '=', $model);
            });
        }
        // $query->orWhereRaw('REGEXP_REPLACE(phone, "[^0-9]", "") = ?', [$searchQuery]);
        $query->orderBy('updated_at', 'desc');
        $data = $query->paginate(10);

        return response()->json([
            'data' => $data ?? [],
        ], 200);
    }

    public function show($id)
    {
        $pr = ProductRegistration::where('id', $id)->with('prf')->first();
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

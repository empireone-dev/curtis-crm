<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\ProductRegistration;
use App\Models\ProductRegistrationFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductRegistrationController extends Controller
{
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

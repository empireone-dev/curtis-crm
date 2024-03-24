<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        $file = $request->file('file')->store('images');
        $url = Storage::disk('s3')->url($file); 

        Image::create([
            'title'=>$request->title,
            'path'=>$url
        ]);
        return response()->json([
            'url' => $url
        ], 200);
    }
}

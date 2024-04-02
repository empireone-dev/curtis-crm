<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function store(Request $request)
    {
        // having an error for not same file extension
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $uploadedFile) {
                $path = $uploadedFile->store('images', 's3');
                $url = Storage::disk('s3')->url($path);
                File::create([
                    'ticket_id' => $request->ticket_id,
                    'url' => $url,
                    'type' => $request->type,
                ]);
            }
        }

        return response()->json([
            'url' => 'success',
        ], 200);
    }

    public function show($ticket_id)
    {
        $files  = File::where('ticket_id', $ticket_id)->get();
        return response()->json([
            'data' => $files,
        ], 200);
    }
}

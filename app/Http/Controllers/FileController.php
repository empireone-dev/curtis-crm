<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Ticket;
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
        Ticket::where('id', $request->ticket_id)->update([
            'isUploading'=>'true'
        ]);
        return response()->json([
            'url' => 'success',
        ], 200);
    }

    public function show($ticket_id)
    {
        $files = File::where('ticket_id', $ticket_id)
            ->whereIn('type', [
                'bill_of_sale',
                'defect_issue',
                'front_of_the_unit',
                'readable_serial_section',
                'rear_of_the_unit',
                'clear_model',
                'parts_model',
                'receipt_model',
                'serial_model'
            ])
            ->get()
            ->groupBy('type');
        $tickets = Ticket::where('id', $ticket_id)->first();
        return response()->json([
            'data' => $files,
            'ticket' => $tickets
        ], 200);
    }

    public function destroy($id)
    {
        $files  = File::where('id', $id)->delete();
        return response()->json([
            'data' => $files,
        ], 200);
    }
}

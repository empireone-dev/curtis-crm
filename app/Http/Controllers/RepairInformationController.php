<?php

namespace App\Http\Controllers;

use App\Models\RepairFiles;
use App\Models\RepairInformation;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class RepairInformationController extends Controller
{
    public function store(Request $request)
    {
        // Validate request
        $request->validate([
            'dealer.attachments' => 'nullable|array',
            'dealer.attachments.*' => 'string',
            'dealer.invoices' => 'nullable|array',
            'dealer.invoices.*' => 'string',
            'ticket_id' => 'required'
        ]);


        RepairInformation::updateOrCreate(
            ['ticket_id' => $request->ticket_id],
            $request->dealer
        );
        $ticket=Ticket::where('ticket_id',$request->ticket_id)->first();
        if ($ticket) {
            $ticket->update([
                'decision_status' =>$request->decision_status,
                'status' =>$request->status,
            ]);
        }
        if ($request->dealer['attachments'] ?? null) {
            foreach ($request->dealer['attachments'] as $base64File) {
                if (preg_match('/^data:image\/(\w+);base64,/', $base64File, $matches)) {
                    $extension = $matches[1];
                    $base64File = substr($base64File, strpos($base64File, ',') + 1);
                    $imageData = base64_decode($base64File);

                    if ($imageData === false) {
                        return response()->json(['error' => 'Invalid Base64 data'], 400);
                    }

                    $filename = date("Y") . '/' . Str::random(20) . '.' . $extension;
                    Storage::disk('s3')->put($filename, $imageData);
                    $url = Storage::disk('s3')->url($filename);
                    RepairFiles::create([
                        'repair_information_id' => $request->ticket_id,
                        'file' => $url,
                        'type' => 'attachment'
                    ]);
                } else {
                    return response()->json(['error' => 'Invalid Base64 format'], 400);
                }
            }
        }


        if ($request->dealer['invoices'] ?? null) {
            foreach ($request->dealer['invoices'] as $base64File) {
                if (preg_match('/^data:image\/(\w+);base64,/', $base64File, $matches)) {
                    $extension = $matches[1];
                    $base64File = substr($base64File, strpos($base64File, ',') + 1);
                    $imageData = base64_decode($base64File);

                    if ($imageData === false) {
                        return response()->json(['error' => 'Invalid Base64 data'], 400);
                    }

                    $filename = date("Y") . '/' . Str::random(20) . '.' . $extension;
                    Storage::disk('s3')->put($filename, $imageData);
                    $url = Storage::disk('s3')->url($filename);
                    RepairFiles::create([
                        'repair_information_id' => $request->ticket_id,
                        'file' => $url,
                        'type' => 'invoice'
                    ]);
                } else {
                    return response()->json(['error' => 'Invalid Base64 format'], 400);
                }
            }
        }
        return response()->json(['status' => 'success'], 200);
    }
}

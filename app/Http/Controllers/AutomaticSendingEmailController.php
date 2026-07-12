<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AutomaticSendingEmailController extends Controller
{
    public function manual_send_lacking_information(Request $request)
    {
        $fileLabels = [
            'readable_serial_section' => 'Readable Serial Number',
            'bill_of_sale'            => 'Bill of Sale / Purchase Receipt',
            'defect_issue'            => 'Photo or Video of the Defect'
        ];

        $tickets = Ticket::where('id', '=', $request->ticket_id)->get();

        $googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxPA9n7MGp1XZ2XzfmUhFramVV6j2S8goavJ15Ezcl7GN_rWUqgTE3xIIkc4bF6TMff/exec';
        $emailsSent = 0;
        $lackingsValues = implode(',', $request->input('lackings', []));
        foreach ($tickets as $ticket) {
            $uploadLink = "https://curtis-international.com/resolution/search/" . $ticket->serial_number . "?tab=upload&lackings=" . urlencode($lackingsValues) . '&notes=' . $request->notes;
            $logoUrl = "https://curtis-international.com/images/logo.png";
            // 1. Build the missing files HTML list
            $missingFilesHtml = '';
            if (!empty($request->lackings) && is_array($request->lackings)) {
                $missingFilesHtml = "<p>Specifically, we are missing the following:</p><ul style='background-color: #f8f9fa; padding: 15px 15px 15px 35px; border-radius: 5px;'>";

                foreach ($request->lackings as $rawName) {
                    $cleanName = $fileLabels[$rawName] ?? $rawName;
                    $missingFilesHtml .= "<li style='margin-bottom: 8px; color: #dc3545;'><strong>" . htmlspecialchars($cleanName) . "</strong></li>";
                }
                $missingFilesHtml .= "</ul>";
            }

            // 2. Build the Notes HTML (New Addition)
            $notesHtml = '';
            if (!empty($request->notes)) {
                // nl2br converts standard line breaks from the textarea into HTML <br> tags
                $safeNotes = nl2br(htmlspecialchars($request->notes));
                $notesHtml = "
            <div style='background-color: #f0f8ff; padding: 15px; border-left: 4px solid #0056b3; margin-top: 20px; border-radius: 4px;'>
                <p style='margin-top: 0; margin-bottom: 8px; color: #0056b3;'><strong>Message from our team:</strong></p>
                <p style='margin: 0; font-style: italic;'>" . $safeNotes . "</p>
            </div>";
            }

            // 3. Construct the HTML Body
            $htmlBody = '
<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 25px;">
    
    <div style="text-align: center; margin-bottom: 20px;">
        <img src="' . $logoUrl . '" alt="Company Logo" style="max-width: 150px; height: auto; border: none; outline: none;">
    </div>

    <h2 style="color: #0056b3;">Action Required: Missing Information</h2>
    <p>Hi there,</p>
    <p>We are reviewing your ticket (<strong>#' . $ticket->id . '</strong>), but we noticed there are some missing photos required for validation.</p>
    
    ' . $missingFilesHtml . '
    
    ' . $notesHtml . '
    
    <div style="text-align: center; margin: 30px 0;">
        <a href="' . $uploadLink . '" style="background-color: #28a745; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Upload Missing Photos</a>
    </div>
    
    <p style="color: #856404; background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107;">
        <strong>Important:</strong> Please provide these within the next 7 days, or your ticket will be closed.
    </p>
    
</div>';

            // 4. Trigger the Google Apps Script
            $httpResponse = Http::asForm()->post($googleScriptUrl, [
                'recipient' => $ticket->email,
                'subject'   => 'Action Required: Missing Information for Ticket # ' . $ticket->ticket_id,
                'body'      => $htmlBody
            ]);

            if ($httpResponse->successful()) {
                $emailsSent++;
            }
        }

        return response()->json([
            'status'        => 'success',
            'tickets_found' => $tickets->count(),
            'emails_sent'   => $emailsSent
        ], 200);
    }
}

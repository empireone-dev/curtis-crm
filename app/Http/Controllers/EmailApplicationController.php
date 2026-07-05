<?php

namespace App\Http\Controllers;

use App\Models\EmailApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class EmailApplicationController extends Controller
{
    public function store(Request $request)
    {
        $emails = $request->json()->all();

        if (empty($emails)) {
            return response()->json(['error' => 'No payload provided'], 400);
        }

        $processedCount = 0;

        foreach ($emails as $emailData) {
            $emailDate = isset($emailData['date']) ? Carbon::parse($emailData['date']) : now();

            // 1. Create or Update the Parent Application Record First
            $application = EmailApplication::updateOrCreate(
                ['message_id' => $emailData['messageId']],
                [
                    'subject' => $emailData['subject'] ?? 'No Subject',
                    'from_email' => $emailData['from'] ?? '',
                    'to_email' => $emailData['to'] ?? '',
                    'email_date' => $emailDate,
                    'thread_id' => $emailData['threadId'] ?? '',
                    'message_count' => $emailData['count'] ?? 1,
                    'source' => $emailData['source'] ?? 'Support2',
                    'body' => $emailData['body'] ?? '',
                    'threads' => $emailData['threads'] ?? [],
                ]
            );

            // 2. Process Attachments and Link Them Relationaly
            // 2. Process Attachments and Link Them Relationaly
            if (!empty($emailData['attachments']) && is_array($emailData['attachments'])) {
                foreach ($emailData['attachments'] as $attachment) {
                    try {
                        $decodedFile = base64_decode($attachment['base64']);

                        if ($decodedFile) {
                            // 1. Define the exact path and filename for S3
                            $safeFilename = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', $attachment['name']);
                            $path = date("Y") . '/' . $safeFilename;

                            // 2. Upload the raw data to S3
                            Storage::disk('s3')->put($path, $decodedFile, [
                                'ContentType' => $attachment['contentType']
                            ]);

                            // 3. Get the public S3 URL (Optional: or just save $path)
                            $url = Storage::disk('s3')->url($path);

                            // 4. Save to database
                            $application->attachments()->updateOrCreate(
                                ['name' => $attachment['name']],
                                [
                                    'content_type' => $attachment['contentType'],
                                    'size' => $attachment['size'],
                                    'path' => $url, // Or just use $path if you prefer storing relative paths
                                ]
                            );
                        }
                    } catch (\Exception $e) {
                        Log::error("Failed to save attachment for Application ID {$application->id}: " . $e->getMessage());
                    }
                }
            }

            $processedCount++;
        }

        return response()->json([
            'status' => 'success',
            'message' => "Successfully processed {$processedCount} applicant emails and separated their attachments."
        ], 200);
    }
}

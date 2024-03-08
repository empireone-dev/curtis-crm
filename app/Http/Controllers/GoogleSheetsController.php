<?php

namespace App\Http\Controllers;

use App\Services\GoogleSheetsService;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class GoogleSheetsController extends Controller
{
    protected $googleSheetsService;


    public function getSheetData($gid)
    {
        // Use the Google Sheets service to fetch data
        $spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/11tds5mFC_AFWpSjVso01SWCLQ99gbCS0shJP6jr7Hb0/edit#gid='.$gid;

        // Extract spreadsheet ID and sheet name from the URL
        preg_match('/\/d\/([^\/]+)/', $spreadsheetUrl, $matches);
        $spreadsheetId = $matches[1];

        preg_match('/gid=([^&]+)/', $spreadsheetUrl, $matches);
        $sheetName = $matches[1];

        $url = "https://docs.google.com/spreadsheets/d/$spreadsheetId/export?format=csv&gid=$sheetName";
        try {
            $client = new Client();
            $response = $client->get($url, [
                'verify' => false,  // Disable SSL verification (use with caution)
            ]);
            if ($response->getStatusCode() == 200) {
                $csvData = $response->getBody()->getContents();

                // Process the CSV data and get all cells directly
                $data = array_map('str_getcsv', explode(PHP_EOL, $csvData));
                $header = array_shift($data);

                // Extract values directly from the data
                $values = [];
                foreach ($data as $row) {
                    $values[] = $row;
                }
                return $values;
            } else {
                // Handle error
                return 'Error fetching spreadsheet data';
            }
        } catch (\Exception $e) {
            // Handle exception
            return $e->getMessage();
        }
    }
}

<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AgentNoteController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CommonIssueController;
use App\Http\Controllers\EmailTemplateController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\GoogleSheetsController;
use App\Http\Controllers\ItemTypeController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/google-sheets/{gid}', [GoogleSheetsController::class, 'getSheetData']);

Route::resource('users',UserController::class);
Route::resource('permissions',PermissionController::class);
Route::resource('email_templates',EmailTemplateController::class);
Route::resource('role',RoleController::class);
Route::resource('activities',ActivityController::class);
Route::resource('notes',AgentNoteController::class);

Route::resource('tickets',TicketController::class);
Route::put('/update_explanation/{gid}', [TicketController::class, 'update_explanation']);
Route::put('/update_tickets_status/{gid}', [TicketController::class, 'update_tickets_status']);
Route::get('/get_tickets_by_ticket_id/{ticket_id}', [TicketController::class, 'get_tickets_by_ticket_id']);

Route::resource('brands',BrandController::class);
Route::resource('item_types',ItemTypeController::class);
Route::resource('common_issues',CommonIssueController::class);
Route::resource('files',FileController::class);



Route::middleware('auth:sanctum')->resource('flights', FlightController::class);


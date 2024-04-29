<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AgentNoteController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CommonIssueController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailTemplateController;
use App\Http\Controllers\FedExController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\GoogleSheetsController;
use App\Http\Controllers\InternalController;
use App\Http\Controllers\ItemTypeController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\RefundController;
use App\Http\Controllers\RepairController;
use App\Http\Controllers\ReplacementController;
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
Route::post('/get_specific_item/{gid}', [GoogleSheetsController::class, 'get_specific_item']);

Route::post('/get_fedex_rate/{ticketid}', [FedExController::class, 'get_fedex_rate']);


Route::resource('replacement',ReplacementController::class);

Route::resource('refund',RefundController::class);
Route::post('/warranty_checkque_shipped', [RefundController::class, 'warranty_checkque_shipped']);

Route::resource('repair',RepairController::class);
Route::resource('receipt',ReceiptController::class);


Route::resource('users',UserController::class);
Route::get('/get_user_by_role/{role_id}', [UserController::class, 'get_user_by_role']);

Route::resource('permissions',PermissionController::class);
Route::resource('internals',InternalController::class);

Route::resource('email_templates',EmailTemplateController::class);
Route::post('validation', [EmailTemplateController::class, 'validation']);
Route::post('availability', [EmailTemplateController::class, 'availability']);
Route::post('callback', [EmailTemplateController::class, 'callback']);

Route::resource('role',RoleController::class);
Route::resource('activities',ActivityController::class);
Route::resource('notes',AgentNoteController::class);

Route::resource('tickets',TicketController::class);
Route::post('get_tickets_by_warehouse/{country}', [TicketController::class, 'get_tickets_by_warehouse']);

Route::put('/update_explanation/{gid}', [TicketController::class, 'update_explanation']);
Route::put('/update_tickets_status/{gid}', [TicketController::class, 'update_tickets_status']);
Route::get('/get_tickets_by_ticket_id/{ticket_id}', [TicketController::class, 'get_tickets_by_ticket_id']);

Route::resource('brands',BrandController::class);
Route::resource('item_types',ItemTypeController::class);
Route::resource('common_issues',CommonIssueController::class);
Route::resource('files',FileController::class);


Route::get('/administrator_dashboard', [DashboardController::class, 'administrator_dashboard']);


Route::middleware('auth:sanctum')->resource('flights', FlightController::class);


<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AddressLookupController;
use App\Http\Controllers\AgentNoteController;
use App\Http\Controllers\AppScriptController;
use App\Http\Controllers\AuthApiController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CasesLogController;
use App\Http\Controllers\CommonIssueController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DecisionMakingController;
use App\Http\Controllers\DirectEmailController;
use App\Http\Controllers\EmailTemplateController;
use App\Http\Controllers\FedExController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\GoogleMap;
use App\Http\Controllers\GoogleSheetsController;
use App\Http\Controllers\InternalController;
use App\Http\Controllers\ItemTypeController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProductRegistrationController;
use App\Http\Controllers\RecallController;
use App\Http\Controllers\RecallLogController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\RefundController;
use App\Http\Controllers\RepairController;
use App\Http\Controllers\RepairInformationController;
use App\Http\Controllers\ReplacementController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UspsController;
use App\Models\CustomerDetailsLog;
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


Route::post('/usps/zipcode-lookup', [UspsController::class, 'zipCodeLookup']);
Route::post('/address_lookup', [AddressLookupController::class, 'address_lookup']);
Route::post('/validate-address', [USPSController::class, 'validateAddress']);

Route::get('/google-sheets/{gid}', [GoogleSheetsController::class, 'getSheetData']);
Route::post('/get_specific_item/{gid}', [GoogleSheetsController::class, 'get_specific_item']);

Route::post('/get_fedex_rate/{ticketid}', [FedExController::class, 'get_fedex_rate']);


Route::resource('replacement', ReplacementController::class);
Route::resource('product_registration', ProductRegistrationController::class);
Route::resource('customer_details_logs', CustomerDetailsLog::class);

Route::get('/get_product_registration/{serial}', [ProductRegistrationController::class, 'get_product_registration']);

Route::post('/parts_replacement_shipped', [ReplacementController::class, 'parts_replacement_shipped']);
Route::post('/parts_replacement_not_shipped', [ReplacementController::class, 'parts_replacement_not_shipped']);

Route::resource('decision_making', DecisionMakingController::class);

Route::resource('refund', RefundController::class);
Route::post('/warranty_checkque_shipped', [RefundController::class, 'warranty_checkque_shipped']);
Route::post('/upload_csv_file', [RefundController::class, 'upload_csv_file']);


Route::resource('repair', RepairController::class);
Route::put('/unrepair/{ticketid}', [RepairController::class, 'unrepair']);


Route::resource('receipt', ReceiptController::class);


Route::resource('users', UserController::class);
Route::get('/get_user_by_role/{role_id}', [UserController::class, 'get_user_by_role']);
Route::get('/get_user_by_id/{id}', [UserController::class, 'get_user_by_id']);

Route::resource('permissions', PermissionController::class);
Route::resource('internals', InternalController::class);
Route::post('auth/login', [AuthApiController::class, 'login']);
Route::post('auth/logout', [AuthApiController::class, 'logout']);

Route::resource('email_templates', EmailTemplateController::class);
Route::post('validation', [EmailTemplateController::class, 'validation']);
Route::post('availability', [EmailTemplateController::class, 'availability']);
Route::post('callback', [EmailTemplateController::class, 'callback']);

Route::resource('role', RoleController::class);
Route::resource('activities', ActivityController::class);
Route::get('export_by_the_warehouse', [ActivityController::class, 'export_by_the_warehouse']);
Route::resource('notes', AgentNoteController::class);

Route::resource('tickets', TicketController::class);
// Route::middleware('auth:sanctum')->prefix('administrator')->group(function () {
Route::post('get_tickets_by_warehouse/{country}', [TicketController::class, 'get_tickets_by_warehouse']);
Route::post('get_tickets_by_asc/{userid}', [TicketController::class, 'get_tickets_by_asc']);
Route::post('escalated', [TicketController::class, 'escalated']);
Route::get('queueing', [TicketController::class, 'queueing']);
Route::put('close_ticket/{ticket_id}', [TicketController::class, 'close_ticket']);
Route::put('transfer_ticket/{ticket_id}', [TicketController::class, 'transfer_ticket']);
Route::get('get_tickets_by_email/{email}', [TicketController::class, 'get_tickets_by_email']);
Route::post('search_tickets', [TicketController::class, 'search_tickets']);
Route::get('/get_users', [TicketController::class, 'get_users']);
Route::post('forward_ticket', [TicketController::class, 'forward_ticket']);
Route::post('export_process_ticket', [TicketController::class, 'export_process_ticket']);

Route::get('cases', [TicketController::class, 'cases']);
Route::get('direct_emails', [TicketController::class, 'direct_emails']);
Route::get('save_direct_emails', [TicketController::class, 'save_direct_emails']);
Route::get('save_direct_emails_parts', [TicketController::class, 'save_direct_emails_parts']);
Route::put('transfer_ticket_cases', [TicketController::class, 'transfer_ticket_cases']);
Route::post('create_verify_tickets', [TicketController::class, 'create_verify_tickets']);
Route::post('verify_tickets', [TicketController::class, 'verify_tickets']);
Route::get('export_ticket_files', [TicketController::class, 'export_ticket_files']);

Route::post('move_ticket_assignment', [TicketController::class, 'move_ticket_assignment']);
Route::post('resend_email_templete', [TicketController::class, 'resend_email_templete']);
Route::post('create_ticket_close', [TicketController::class, 'create_ticket_close']);
Route::get('check_serial_number/{serial_number}', [TicketController::class, 'check_serial_number']);
Route::post('search_lookup_tickets', [TicketController::class, 'search_lookup_tickets']);
Route::get('get_ticket_by_id/{id}', [TicketController::class, 'get_ticket_by_id']);
Route::get('get_email_replies', [TicketController::class, 'get_email_replies']);
Route::get('get_email_replies_parts', [TicketController::class, 'get_email_replies_parts']);
Route::get('sample', [TicketController::class, 'sample']);
Route::get('get_tickets_warehouse/{country}', [TicketController::class, 'get_tickets_warehouse']);
Route::post('upload_rma_request', [TicketController::class, 'upload_rma_request']);
Route::put('ticket_export_status', [TicketController::class, 'ticket_export_status']);
Route::post('change_isExport', [TicketController::class, 'change_isExport']);
Route::post('change_check_all', [TicketController::class, 'change_check_all']);
Route::get('get_agent_note_by_contact_number', [TicketController::class, 'get_agent_note_by_contact_number']);
// });

Route::post('get_warranty_unread_email', [AppScriptController::class, 'get_warranty_unread_email']);
Route::post('get_parts_unread_email', [AppScriptController::class, 'get_parts_unread_email']);
Route::post('get_recall_unread_email', [AppScriptController::class, 'get_recall_unread_email']);
Route::post('remove_unread_email', [AppScriptController::class, 'remove_unread_email']);


Route::resource('recall', RecallController::class);
Route::resource('recall_log', RecallLogController::class);
Route::get('recall_stats', [RecallLogController::class, 'get_recall_unread_email']);


Route::put('transfer_direct_email', [DirectEmailController::class, 'transfer_direct_email']);
Route::resource('direct_email', DirectEmailController::class);



Route::put('/update_explanation/{gid}', [TicketController::class, 'update_explanation']);
Route::put('/update_tickets_status/{gid}', [TicketController::class, 'update_tickets_status']);
Route::get('/get_tickets_by_ticket_id/{ticket_id}', [TicketController::class, 'get_tickets_by_ticket_id']);
Route::get('/get_tickets_by_ticket_details_id/{ticket_id}', [TicketController::class, 'get_tickets_by_ticket_details_id']);
Route::post('/accept_acknowledge', [TicketController::class, 'accept_acknowledge']);
Route::post('/received_item', [TicketController::class, 'received_item']);


Route::resource('repair_information', RepairInformationController::class);
Route::post('/upload_attachment', [RepairInformationController::class, 'upload_attachment']);

Route::resource('brands', BrandController::class);
Route::resource('item_types', ItemTypeController::class);
Route::resource('common_issues', CommonIssueController::class);
Route::resource('files', FileController::class);
Route::post('/upload_photo_status', [FileController::class, 'upload_photo_status']);


Route::resource('caseslog', CasesLogController::class);
Route::get('/get_caseslog_by_ticket_id_direct_email/{id}', [CasesLogController::class, 'get_caseslog_by_ticket_id_direct_email']);

Route::get('/administrator_dashboard', [DashboardController::class, 'administrator_dashboard']);
Route::get('/customer_dashboard/{userid}', [DashboardController::class, 'customer_dashboard']);
Route::get('/warehouse_dashboard/{country}', [DashboardController::class, 'warehouse_dashboard']);
Route::get('/asc_dashboard/{userid}', [DashboardController::class, 'asc_dashboard']);
Route::get('/agent_dashboard/{userid}', [DashboardController::class, 'agent_dashboard']);




Route::middleware('auth:sanctum')->resource('flights', FlightController::class);



Route::post('/get_cities', [GoogleMap::class, 'get_cities']);

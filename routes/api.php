<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\EmailTemplateController;
use App\Http\Controllers\GoogleSheetsController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProductController;
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
Route::resource('email_template',EmailTemplateController::class);
Route::resource('role',RoleController::class);
Route::resource('tickets',TicketController::class);
Route::resource('brands',BrandController::class);
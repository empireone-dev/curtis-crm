<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

//dashboard
//permissions
//roles
//users
//brands
//email template
//item types
//common issues
//products
//tickets
//ASCS
//Bulk Upload Products
//export Management
//handle tickets Tracker
Route::get('/', function () {
    return Inertia::render('login/page');
})->name('home.login');


Route::get('/ticket-form', function () {
    return Inertia::render('ticket_form/page');
})->name('dashboard');

Route::middleware('auth:sanctum')->prefix('administrator')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard/page');
    })->name('dashboard');

    Route::get('/permissions', function () {
        return Inertia::render('permissions/page');
    })->name('permissions');

    Route::get('/roles', function () {
        return Inertia::render('roles/page');
    })->name('roles');

    Route::get('/users', function () {
        return Inertia::render('users/page');
    })->name('users');

    Route::get('/brands', function () {
        return Inertia::render('brands/page');
    })->name('brands');

    Route::get('/email_template', function () {
        return Inertia::render('email_template/page');
    })->name('email_template');

    Route::get('/item_types', function () {
        return Inertia::render('item_types/page');
    })->name('item_types');

    Route::get('/common_issues', function () {
        return Inertia::render('common_issues/page');
    })->name('common_issues');

    Route::get('/products', function () {
        return Inertia::render('products/page');
    })->name('products');

    Route::prefix('tickets')->group(function () {
        Route::get('/', function () {
            return Inertia::render('tickets/page');
        })->name('tickets');
        
        Route::get('/{details}', function () {
            return Inertia::render('tickets/details/page');
        })->name('tickets.details');

        Route::get('/create', function () {
            return Inertia::render('tickets/create/page');
        })->name('tickets.create');
    });


    Route::get('/asc', function () {
        return Inertia::render('ascs/page');
    })->name('asc');

    Route::get('/bup', function () {
        return Inertia::render('bup/page');
    })->name('bup');

    Route::get('/htt', function () {
        return Inertia::render('htt/page');
    })->name('htt');
    Route::get('/em', function () {
        return Inertia::render('em/page');
    })->name('em');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

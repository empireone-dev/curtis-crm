<?php

use App\Http\Controllers\EmailTemplateController;
use App\Http\Controllers\GoogleSignInController;
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



// Start Send Email

Route::get('send_mail_create_ticket_form', [EmailTemplateController::class, 'send_mail_create_ticket_form']);
// Route::get('validation', [EmailTemplateController::class, 'validation']);
//End Send EMail



// START GOOGLE LOGIN
Route::get('auth/google', [GoogleSignInController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [GoogleSignInController::class, 'handleGoogleCallback']);
//END GOOGLE LOGIN

Route::middleware('redirectBasedOnRole')->get('/', function () {
    return Inertia::render('login/page');
})->name('home.login');

Route::get('/ticket-form', function () {
    return Inertia::render('ticket_form/page');
})->name('dashboard');

// Route::get('/show_ticket_email', function () {
//     return view('mail.mail-create-ticket-form');
// });




Route::middleware('auth:sanctum', 'role:1')->prefix('administrator')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('admin/dashboard/page');
    })->name('dashboard');

    Route::get('google_map/{id}', function () {
        return Inertia::render('admin/maps/page');
    })->name('google_map');

    Route::get('/permissions', function () {
        return Inertia::render('admin/permissions/page');
    })->name('permissions');

    Route::get('/roles', function () {
        return Inertia::render('admin/roles/page');
    })->name('roles');

    Route::get('/users', function () {
        return Inertia::render('admin/users/page');
    })->name('users');

    Route::get('/brands', function () {
        return Inertia::render('admin/brands/page');
    })->name('brands');

    Route::get('/settings', function () {
        return Inertia::render('admin/settings/page');
    })->name('settings');

    Route::get('/email_template', function () {
        return Inertia::render('admin/email_template/page');
    })->name('email_template');

    Route::get('/item_types', function () {
        return Inertia::render('admin/item_types/page');
    })->name('item_types');

    Route::get('/common_issues', function () {
        return Inertia::render('admin/common_issues/page');
    })->name('common_issues');

    Route::get('/products', function () {
        return Inertia::render('admin/products/page');
    })->name('products');

    Route::prefix('tickets')->group(function () {
        Route::get('/', function () {
            return Inertia::render('admin/tickets/page');
        })->name('tickets');
        
        // Route::get('/details/{ticket_id}', function () {
        //     return Inertia::render('admin/tickets/details/page');
        // })->name('tickets.details');

        Route::get('/details/{ticket_id}', function () {
            return Inertia::render('admin/tickets/details/id/page');
        })->name('tickets.details');

        Route::get('/create', function () {
            return Inertia::render('admin/tickets/create/page');
        })->name('tickets.create');
    });


    Route::get('/asc', function () {
        return Inertia::render('admin/asc/page');
    })->name('asc');

    Route::get('/bup', function () {
        return Inertia::render('admin/bup/page');
    })->name('bup');

    Route::get('/htt', function () {
        return Inertia::render('admin/htt/page');
    })->name('htt');
    Route::get('/em', function () {
        return Inertia::render('admin/em/page');
    })->name('em');
});

Route::middleware('auth:sanctum', 'role:2')->prefix('customer')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('customer/dashboard/page');
    })->name('customer.dashboard');

    Route::get('/tickets', function () {
        return Inertia::render('customer/tickets/page');
    })->name('customer.tickets');
    
    
    Route::get('/tickets/{id}', function () {
        return Inertia::render('customer/tickets/details/page');
    })->name('customer.tickets.details');
});


Route::middleware('auth:sanctum', 'role:3')->prefix('warehouse')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('warehouse/dashboard/page');
    })->name('warehouse.dashboard');

    Route::get('/tickets', function () {
        return Inertia::render('warehouse/tickets/page');
    })->name('warehouse.tickets');
    
    Route::get('/tickets/{id}', function () {
        return Inertia::render('warehouse/tickets/details/page');
    })->name('warehouse.tickets.details');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';


Route::get('/{any}', function () {
    return Inertia::render('error404');
})->where('any', '.*')->name('error404');
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
Route::get('fetch_emails', [GoogleSignInController::class, 'fetchEmails']);
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



Route::get('/customer/web_form', function () {
    return Inertia::render('web_form/page');
})->name('dashboard');

Route::middleware('auth:sanctum', 'role:1')->prefix('administrator')->group(function () {

    Route::prefix('tickets')->group(function () {
        Route::get('/', function () {
            return Inertia::render('admin/tickets/page');
        })->name('tickets');

        Route::get('/details/{ticket_id}/files', function () {
            return Inertia::render('admin/tickets/details/contents/files/page');
        })->name('admin.tickets.details.files');

        Route::get('/details/{ticket_id}/activities', function () {
            return Inertia::render('admin/tickets/details/contents/activities/page');
        })->name('admin.tickets.details.activities');

        Route::get('/details/{ticket_id}/details', function () {
            return Inertia::render('admin/tickets/details/contents/details/page');
        })->name('admin.tickets.details.details');

        Route::get('/details/{ticket_id}/availability', function () {
            return Inertia::render('admin/tickets/details/contents/availability/page');
        })->name('admin.tickets.details.availability');

        Route::get('/details/{ticket_id}/internals', function () {
            return Inertia::render('admin/tickets/details/contents/internals/page');
        })->name('admin.tickets.details.internals');

        Route::get('/details/{ticket_id}/callback', function () {
            return Inertia::render('admin/tickets/details/contents/call_back/page');
        })->name('admin.tickets.details.call_back');

        Route::get('/details/{ticket_id}/parts_validation', function () {
            return Inertia::render('admin/tickets/details/contents/parts_validation/page');
        })->name('admin.tickets.details.parts_validation');

        Route::get('/details/{ticket_id}/refund', function () {
            return Inertia::render('admin/tickets/details/contents/refund/page');
        })->name('admin.tickets.details.refund');

        Route::get('/details/{ticket_id}/repair', function () {
            return Inertia::render('admin/tickets/details/contents/repair/page');
        })->name('admin.tickets.details.repair');

        Route::get('/details/{ticket_id}/notes', function () {
            return Inertia::render('admin/tickets/details/contents/notes/page');
        })->name('admin.tickets.details.notes');

        Route::get('/details/{ticket_id}/replacement_parts', function () {
            return Inertia::render('admin/tickets/details/contents/replacement_parts/page');
        })->name('admin.tickets.details.replacement_parts');

        Route::get('/details/{ticket_id}/replacement', function () {
            return Inertia::render('admin/tickets/details/contents/replacement_warranty/page');
        })->name('admin.tickets.details.replacement_warranty');

        // Route::get('/details/{ticket_id}/replacement_status', function () {
        //     return Inertia::render('admin/tickets/details/contents/replacement_status/page');
        // })->name('admin.tickets.details.replacement_status');

        Route::get('/details/{ticket_id}/status', function () {
            return Inertia::render('admin/tickets/details/contents/status/page');
        })->name('admin.tickets.details.status');

        Route::get('/details/{ticket_id}/warehouse', function () {
            return Inertia::render('admin/tickets/details/contents/warehouse/page');
        })->name('admin.tickets.details.warehouse');

        Route::get('/details/{ticket_id}/warranty_validation', function () {
            return Inertia::render('admin/tickets/details/contents/warranty_validation/page');
        })->name('admin.tickets.details.warranty_validation');

        Route::get('/details/{ticket_id}/decision', function () {
            return Inertia::render('admin/tickets/details/contents/decision_making/page');
        })->name('admin.tickets.details.decision_making');

        Route::get('/details/{ticket_id}/edit', function () {
            return Inertia::render('admin/tickets/details/contents/details/id/page');
        })->name('admin.tickets.details.edit');
        // Route::get('/details/{ticket_id}', function () {
        //     return Inertia::render('admin/tickets/details/id/page');
        // })->name('tickets.details');

        Route::get('/create', function () {
            return Inertia::render('admin/tickets/create/page');
        })->name('tickets.create');
    });

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

    Route::get('/users/{userid}', function () {
        return Inertia::render('admin/users/tickets/page');
    })->name('users.tickets');

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

    Route::get('/settings', function () {
        return Inertia::render('customer/settings/page');
    })->name('customer.settings');
});


Route::middleware('auth:sanctum', 'role:3')->prefix('warehouse')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('warehouse/dashboard/page');
    })->name('warehouse.dashboard');

    Route::get('/tickets', function () {
        return Inertia::render('warehouse/tickets/page');
    })->name('warehouse.tickets');

    // Route::get('/tickets/{id}', function () {
    //     return Inertia::render('warehouse/tickets/details/page');
    // })->name('warehouse.tickets.details');

    Route::prefix('tickets')->group(function () {
        Route::get('/details/{ticket_id}/files', function () {
            return Inertia::render('admin/tickets/details/contents/files/page');
        })->name('warehouse.tickets.details.files');

        Route::get('/details/{ticket_id}/activities', function () {
            return Inertia::render('admin/tickets/details/contents/activities/page');
        })->name('warehouse.tickets.details.activities');

        Route::get('/details/{ticket_id}/details', function () {
            return Inertia::render('admin/tickets/details/contents/details/page');
        })->name('warehouse.tickets.details.details');

        Route::get('/details/{ticket_id}/availability', function () {
            return Inertia::render('admin/tickets/details/contents/availability/page');
        })->name('warehouse.tickets.details.availability');

        Route::get('/details/{ticket_id}/internals', function () {
            return Inertia::render('admin/tickets/details/contents/internals/page');
        })->name('warehouse.tickets.details.internals');

        Route::get('/details/{ticket_id}/callback', function () {
            return Inertia::render('admin/tickets/details/contents/call_back/page');
        })->name('warehouse.tickets.details.call_back');

        Route::get('/details/{ticket_id}/parts_validation', function () {
            return Inertia::render('admin/tickets/details/contents/parts_validation/page');
        })->name('warehouse.tickets.details.parts_validation');

        Route::get('/details/{ticket_id}/refund', function () {
            return Inertia::render('admin/tickets/details/contents/refund/page');
        })->name('warehouse.tickets.details.refund');

        Route::get('/details/{ticket_id}/repair', function () {
            return Inertia::render('admin/tickets/details/contents/repair/page');
        })->name('warehouse.tickets.details.repair');

        Route::get('/details/{ticket_id}/notes', function () {
            return Inertia::render('admin/tickets/details/contents/notes/page');
        })->name('warehouse.tickets.details.notes');

        Route::get('/details/{ticket_id}/replacement_parts', function () {
            return Inertia::render('admin/tickets/details/contents/replacement_parts/page');
        })->name('warehouse.tickets.details.replacement_parts');

        Route::get('/details/{ticket_id}/replacement', function () {
            return Inertia::render('admin/tickets/details/contents/replacement_warranty/page');
        })->name('warehouse.tickets.details.replacement_warranty');

        // Route::get('/details/{ticket_id}/replacement_status', function () {
        //     return Inertia::render('admin/tickets/details/contents/replacement_status/page');
        // })->name('warehouse.tickets.details.replacement_status');

        Route::get('/details/{ticket_id}/status', function () {
            return Inertia::render('admin/tickets/details/contents/status/page');
        })->name('warehouse.tickets.details.status');

        Route::get('/details/{ticket_id}/warehouse', function () {
            return Inertia::render('admin/tickets/details/contents/warehouse/page');
        })->name('warehouse.tickets.details.warehouse');

        Route::get('/details/{ticket_id}/warranty_validation', function () {
            return Inertia::render('admin/tickets/details/contents/warranty_validation/page');
        })->name('warehouse.tickets.details.warranty_validation');

        Route::get('/details/{ticket_id}/decision', function () {
            return Inertia::render('admin/tickets/details/contents/decision_making/page');
        })->name('warehouse.tickets.details.decision_making');
    });

    Route::get('/settings', function () {
        return Inertia::render('warehouse/settings/page');
    })->name('warehouse.settings');
});

Route::middleware('auth:sanctum', 'role:4')->prefix('asc')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('asc/dashboard/page');
    })->name('asc.dashboard');

    Route::get('/tickets', function () {
        return Inertia::render('asc/tickets/page');
    })->name('asc.tickets');

    // Route::get('/tickets/{id}', function () {
    //     return Inertia::render('asc/tickets/details/page');
    // })->name('asc.tickets.details');

    Route::prefix('tickets')->group(function () {
        Route::get('/details/{ticket_id}/files', function () {
            return Inertia::render('admin/tickets/details/contents/files/page');
        })->name('asc.tickets.details.files');

        Route::get('/details/{ticket_id}/activities', function () {
            return Inertia::render('admin/tickets/details/contents/activities/page');
        })->name('asc.tickets.details.activities');

        Route::get('/details/{ticket_id}/details', function () {
            return Inertia::render('admin/tickets/details/contents/details/page');
        })->name('asc.tickets.details.details');

        Route::get('/details/{ticket_id}/availability', function () {
            return Inertia::render('admin/tickets/details/contents/availability/page');
        })->name('asc.tickets.details.availability');

        Route::get('/details/{ticket_id}/internals', function () {
            return Inertia::render('admin/tickets/details/contents/internals/page');
        })->name('asc.tickets.details.internals');

        Route::get('/details/{ticket_id}/callback', function () {
            return Inertia::render('admin/tickets/details/contents/call_back/page');
        })->name('asc.tickets.details.call_back');

        Route::get('/details/{ticket_id}/parts_validation', function () {
            return Inertia::render('admin/tickets/details/contents/parts_validation/page');
        })->name('asc.tickets.details.parts_validation');

        Route::get('/details/{ticket_id}/refund', function () {
            return Inertia::render('admin/tickets/details/contents/refund/page');
        })->name('asc.tickets.details.refund');

        Route::get('/details/{ticket_id}/repair', function () {
            return Inertia::render('admin/tickets/details/contents/repair/page');
        })->name('asc.tickets.details.repair');

        Route::get('/details/{ticket_id}/notes', function () {
            return Inertia::render('admin/tickets/details/contents/notes/page');
        })->name('asc.tickets.details.notes');

        Route::get('/details/{ticket_id}/replacement_parts', function () {
            return Inertia::render('admin/tickets/details/contents/replacement_parts/page');
        })->name('asc.tickets.details.replacement_parts');

        Route::get('/details/{ticket_id}/replacement', function () {
            return Inertia::render('admin/tickets/details/contents/replacement_warranty/page');
        })->name('asc.tickets.details.replacement_warranty');

        // Route::get('/details/{ticket_id}/replacement_status', function () {
        //     return Inertia::render('admin/tickets/details/contents/replacement_status/page');
        // })->name('asc.tickets.details.replacement_status');

        Route::get('/details/{ticket_id}/status', function () {
            return Inertia::render('admin/tickets/details/contents/status/page');
        })->name('asc.tickets.details.status');

        Route::get('/details/{ticket_id}/warehouse', function () {
            return Inertia::render('admin/tickets/details/contents/warehouse/page');
        })->name('asc.tickets.details.warehouse');

        Route::get('/details/{ticket_id}/warranty_validation', function () {
            return Inertia::render('admin/tickets/details/contents/warranty_validation/page');
        })->name('asc.tickets.details.warranty_validation');

        Route::get('/details/{ticket_id}/decision', function () {
            return Inertia::render('admin/tickets/details/contents/decision_making/page');
        })->name('asc.tickets.details.decision_making');
    });

    Route::get('/settings', function () {
        return Inertia::render('asc/settings/page');
    })->name('asc.settings');
});

Route::middleware('auth:sanctum', 'role:5')->prefix('agent')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('agent/dashboard/page');
    })->name('agent.dashboard');

    Route::get('tickets/details/{ticket_id}/edit', function () {
        return Inertia::render('agent/tickets/details/id/page');
    })->name('tickets.details.edit');

    Route::get('/tickets', function () {
        return Inertia::render('agent/tickets/page');
    })->name('agent.tickets');


    Route::get('/tickets/create', function () {
        return Inertia::render('agent/create/page');
    })->name('agent.tickets.create');

    // Route::get('/tickets/{id}', function () {
    //     return Inertia::render('agent/tickets/details/page');
    // })->name('agent.tickets.details');
    Route::prefix('tickets')->group(function () {
        Route::get('/details/{ticket_id}/files', function () {
            return Inertia::render('admin/tickets/details/contents/files/page');
        })->name('agent.tickets.details.files');

        Route::get('/details/{ticket_id}/activities', function () {
            return Inertia::render('admin/tickets/details/contents/activities/page');
        })->name('agent.tickets.details.activities');

        Route::get('/details/{ticket_id}/details', function () {
            return Inertia::render('admin/tickets/details/contents/details/page');
        })->name('agent.tickets.details.details');

        Route::get('/details/{ticket_id}/availability', function () {
            return Inertia::render('admin/tickets/details/contents/availability/page');
        })->name('agent.tickets.details.availability');

        Route::get('/details/{ticket_id}/internals', function () {
            return Inertia::render('admin/tickets/details/contents/internals/page');
        })->name('agent.tickets.details.internals');

        Route::get('/details/{ticket_id}/callback', function () {
            return Inertia::render('admin/tickets/details/contents/call_back/page');
        })->name('agent.tickets.details.call_back');

        Route::get('/details/{ticket_id}/parts_validation', function () {
            return Inertia::render('admin/tickets/details/contents/parts_validation/page');
        })->name('agent.tickets.details.parts_validation');

        Route::get('/details/{ticket_id}/refund', function () {
            return Inertia::render('admin/tickets/details/contents/refund/page');
        })->name('agent.tickets.details.refund');

        Route::get('/details/{ticket_id}/repair', function () {
            return Inertia::render('admin/tickets/details/contents/repair/page');
        })->name('agent.tickets.details.repair');

        Route::get('/details/{ticket_id}/notes', function () {
            return Inertia::render('admin/tickets/details/contents/notes/page');
        })->name('agent.tickets.details.notes');

        Route::get('/details/{ticket_id}/replacement_parts', function () {
            return Inertia::render('admin/tickets/details/contents/replacement_parts/page');
        })->name('agent.tickets.details.replacement_parts');

        Route::get('/details/{ticket_id}/replacement', function () {
            return Inertia::render('admin/tickets/details/contents/replacement_warranty/page');
        })->name('agent.tickets.details.replacement_warranty');

        // Route::get('/details/{ticket_id}/replacement_status', function () {
        //     return Inertia::render('admin/tickets/details/contents/replacement_status/page');
        // })->name('agent.tickets.details.replacement_status');

        Route::get('/details/{ticket_id}/status', function () {
            return Inertia::render('admin/tickets/details/contents/status/page');
        })->name('agent.tickets.details.status');

        Route::get('/details/{ticket_id}/warehouse', function () {
            return Inertia::render('admin/tickets/details/contents/warehouse/page');
        })->name('agent.tickets.details.warehouse');

        Route::get('/details/{ticket_id}/warranty_validation', function () {
            return Inertia::render('admin/tickets/details/contents/warranty_validation/page');
        })->name('agent.tickets.details.warranty_validation');

        Route::get('/details/{ticket_id}/decision', function () {
            return Inertia::render('admin/tickets/details/contents/decision_making/page');
        })->name('agent.tickets.details.decision_making');
    });

    Route::get('/settings', function () {
        return Inertia::render('agent/settings/page');
    })->name('agent.settings');
});

Route::middleware('auth:sanctum', 'role:6')->prefix('curtis')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('curtis/dashboard/page');
    })->name('curtis.dashboard');

    Route::get('/tickets', function () {
        return Inertia::render('curtis/tickets/page');
    })->name('curtis.tickets');

    // Route::get('/tickets/{id}', function () {
    //     return Inertia::render('curtis/tickets/details/page');
    // })->name('curtis.tickets.details');

    Route::prefix('tickets')->group(function () {
        Route::get('/details/{ticket_id}/files', function () {
            return Inertia::render('admin/tickets/details/contents/files/page');
        })->name('curtis.tickets.details.files');

        Route::get('/details/{ticket_id}/activities', function () {
            return Inertia::render('admin/tickets/details/contents/activities/page');
        })->name('curtis.tickets.details.activities');

        Route::get('/details/{ticket_id}/details', function () {
            return Inertia::render('admin/tickets/details/contents/details/page');
        })->name('curtis.tickets.details.details');

        Route::get('/details/{ticket_id}/availability', function () {
            return Inertia::render('admin/tickets/details/contents/availability/page');
        })->name('curtis.tickets.details.availability');

        Route::get('/details/{ticket_id}/internals', function () {
            return Inertia::render('admin/tickets/details/contents/internals/page');
        })->name('curtis.tickets.details.internals');

        Route::get('/details/{ticket_id}/callback', function () {
            return Inertia::render('admin/tickets/details/contents/call_back/page');
        })->name('curtis.tickets.details.call_back');

        Route::get('/details/{ticket_id}/parts_validation', function () {
            return Inertia::render('admin/tickets/details/contents/parts_validation/page');
        })->name('curtis.tickets.details.parts_validation');

        Route::get('/details/{ticket_id}/refund', function () {
            return Inertia::render('admin/tickets/details/contents/refund/page');
        })->name('curtis.tickets.details.refund');

        Route::get('/details/{ticket_id}/repair', function () {
            return Inertia::render('admin/tickets/details/contents/repair/page');
        })->name('curtis.tickets.details.repair');

        Route::get('/details/{ticket_id}/notes', function () {
            return Inertia::render('admin/tickets/details/contents/notes/page');
        })->name('curtis.tickets.details.notes');

        Route::get('/details/{ticket_id}/replacement_parts', function () {
            return Inertia::render('admin/tickets/details/contents/replacement_parts/page');
        })->name('curtis.tickets.details.replacement_parts');

        Route::get('/details/{ticket_id}/replacement', function () {
            return Inertia::render('admin/tickets/details/contents/replacement_warranty/page');
        })->name('curtis.tickets.details.replacement_warranty');

        // Route::get('/details/{ticket_id}/replacement_status', function () {
        //     return Inertia::render('admin/tickets/details/contents/replacement_status/page');
        // })->name('tickets.details.replacement_status');

        Route::get('/details/{ticket_id}/status', function () {
            return Inertia::render('admin/tickets/details/contents/status/page');
        })->name('tickets.details.status');

        Route::get('/details/{ticket_id}/warehouse', function () {
            return Inertia::render('admin/tickets/details/contents/warehouse/page');
        })->name('tickets.details.warehouse');

        Route::get('/details/{ticket_id}/warranty_validation', function () {
            return Inertia::render('admin/tickets/details/contents/warranty_validation/page');
        })->name('tickets.details.warranty_validation');

        Route::get('/details/{ticket_id}/decision', function () {
            return Inertia::render('admin/tickets/details/contents/decision_making/page');
        })->name('tickets.details.decision_making');
    });

    Route::get('/settings', function () {
        return Inertia::render('curtis/settings/page');
    })->name('curtis.settings');
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

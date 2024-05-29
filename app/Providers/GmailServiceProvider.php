<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\GmailService;

class GmailServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(GmailService::class, function ($app) {
            return new GmailService();
        });
    }

    public function boot(): void
    {
        //
    }
}

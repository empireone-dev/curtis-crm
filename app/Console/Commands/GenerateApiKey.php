<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ApiKey;

class GenerateApiKey extends Command
{
    // Command signature
    protected $signature = 'generate:api-key {user_id?}';

    // Command description
    protected $description = 'Generate a new API key';

    public function handle()
    {
        $userId = $this->argument('user_id');
        $key = ApiKey::generate($userId);

        $this->info("New API key: $key");
    }
}

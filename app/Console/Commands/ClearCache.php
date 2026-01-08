<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class ClearCache extends Command
{
    protected $signature = 'cache:clear-all';
    protected $description = 'Clear all application caches';

    public function handle()
    {
        Cache::flush();
        $this->info('All caches cleared successfully!');
        return 0;
    }
}




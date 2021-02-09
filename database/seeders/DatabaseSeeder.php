<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Andreas',
            'email' => 'andreas@example.com',
            'password' => Hash::make('changeme'),
        ]);

        $user->sites()->create([
            'key' => Str::uuid(),
            'name' => 'Example',
            'url' => 'https://example.com/',
        ]);
    }
}

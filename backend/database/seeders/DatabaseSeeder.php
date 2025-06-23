<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        // Call UsersTableSeeder first to create users
        $this->call(UsersTableSeeder::class);

        // Then call LeavesTableSeeder to create leaves for users
        $this->call(LeavesTableSeeder::class);
    }
}

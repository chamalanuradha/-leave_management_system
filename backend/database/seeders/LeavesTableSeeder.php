<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Leave;

class LeavesTableSeeder extends Seeder
{
    public function run()
    {
     
        $employee = User::where('role', 'USER')->first();

        if ($employee) {
            Leave::create([
                'user_id' => $employee->id,
                'leave_date' => now()->addDays(3)->format('Y-m-d'),
                'leave_type' => 'CASUAL',
                'status' => 'PENDING',
                'reason' => 'Family event',
            ]);

            Leave::create([
                'user_id' => $employee->id,
                'leave_date' => now()->addDays(7)->format('Y-m-d'),
                'leave_type' => 'SICK',
                'status' => 'PENDING',
                'reason' => 'Medical appointment',
            ]);
        }
    }
}

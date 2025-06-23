<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Leave;
use Carbon\Carbon;

class LeavesTableSeeder extends Seeder
{
    public function run()
    {
        $users = User::where('role', 'USER')->get();

        // Define leave types
        $leaveTypes = ['CASUAL', 'SICK', 'ANNUAL'];
        $statuses = ['PENDING', 'APPROVED', 'REJECTED'];
        $reasons = ['Family event', 'Medical appointment', 'Vacation', 'Emergency', 'Personal reason'];

        // Loop and assign 10 leaves randomly to users
        for ($i = 0; $i < 10; $i++) {
            $user = $users->random();
            Leave::create([
                'user_id' => $user->id,
                'leave_date' => Carbon::now()->addDays(rand(1, 30))->format('Y-m-d'),
                'leave_type' => $leaveTypes[array_rand($leaveTypes)],
                'status' => $statuses[array_rand($statuses)],
                'reason' => $reasons[array_rand($reasons)],
            ]);
        }
    }
}

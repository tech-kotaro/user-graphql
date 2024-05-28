<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Task;

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            \App\Models\Task::create([
                'title' => 'title' . $i,
                'content' => 'content' . $i,
                'person_in_charge' => 'person_in_charge' . $i,
            ]);
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $collections = [
            ['name'=>'Summer Collection','slug'=>'summer'],
            ['name'=>'Winter Collection','slug'=>'winter'],
        ];

        foreach($collections as $c){
            \App\Models\Collection::create($c);
        }
    }
}

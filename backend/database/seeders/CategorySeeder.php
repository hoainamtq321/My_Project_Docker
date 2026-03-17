<?php

namespace Database\Seeders;

use App\Models\Category;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categorys = [
            [
                'name' => 'Đầm','slug' => 'dam','children' => [
                    ['name'=> 'Đầm suông','slug'=>'dam-suong'],
                    ['name'=> 'Đầm ôm','slug'=>'dam-om']
            ]],
            [
                'name' => 'Áo','slug' => 'ao','children' => [
                    ['name'=> 'Áo dài','slug'=>'ao-dai'],
                    ['name'=> 'Ngắn tay','slug'=>'ngan-tay']
            ]],
            [
                'name' => 'Set Bộ','slug' => 'set-bo'
            ]
        ];

        foreach($categorys as $item)
        {
            $parent = \App\Models\Category::create([
                'name' => $item['name'],
                'slug' => $item['slug']
            ]);

            if(isset($item['children']))
            {
                foreach($item['children'] as $child)
                {
                    \App\Models\Category::create([
                        'name' => $child['name'],
                        'slug' => $child['slug'],
                        'parent_id' => $parent->id
                    ]);
                }
            }
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
        ]);
        
        // User::factory(10)->create();
        /*
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $categorys = [
            [
                'name' => 'Đầm',
                'slug' => 'dam',
                'children' => [
                    ['name'=> 'Đầm suông','slug'=>'dam-suong'],
                    ['name'=> 'Đầm ôm','slug'=>'dam-om']
                ] 
            ],
            [
                'name' => 'Áo',
                'slug' => 'ao',
                'children' => [
                    ['name'=> 'Áo dài','slug'=>'ao-dai'],
                    ['name'=> 'Ngắn tay','slug'=>'ngan-tay']
                ] 
            ],
            [
                'name' => 'Set Bộ',
                'slug' => 'set-bo'
            ]
        ];
        
        
        

        // Lấy tất cả ID của Category vào một mảng: [1, 2, 3, 4, 5, ...]
        $categoryIds = \App\Models\Category::pluck('id')->toArray();
        
        // Tạo sản phẩm và gán ID lần lượt
        foreach($categoryIds as $id)
        {
            // Với mỗi Category, tạo ra 5 sản phẩm
            for ($i = 1; $i <= 3; $i++) {
                $product = \App\Models\Product::create([
                    'category_id' => $id,
                    'name' => "Sản phẩm $i của danh mục $id",
                    'base_price' => 1000000,
                    'is_on_sale' => false,
                ]);

                // Tạo 3 ảnh giả
                for ($j = 1; $j <= 3; $j++) {
                    $product->images()->create([
                        'image_path' => "https://picsum.photos/400/500?random=" . rand(1, 999),
                        'is_primary' => $j === 1
                    ]);
                }

                // Tạo size M, L
                foreach (['M', 'L'] as $size) {
                    $product->variants()->create([
                        'color' => 'Trắng',
                        'size' => $size,
                        'stock_quantity' => 10,
                        'sku' => $product->name .'-'.$size
                    ]);
                }

            }
        }

        */
    }
}

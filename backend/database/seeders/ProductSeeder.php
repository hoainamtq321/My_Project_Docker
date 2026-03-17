<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoryIds = Category::pluck('id')->toArray();
        
        // Mảng màu sắc để chọn ngẫu nhiên
        $colors = ['Trắng', 'Đen'];

        foreach ($categoryIds as $id) {
            for ($i = 1; $i <= 3; $i++) {
                $product = Product::create([
                    'category_id' => $id,
                    'name' => "Sản phẩm $i của danh mục $id",
                    'base_price' => 1000000,
                    'is_on_sale' => false,
                ]);

                // Seed Ảnh
                for ($j = 1; $j <= 3; $j++) {
                    $product->images()->create([
                        'image_path' => "https://picsum.photos/400/500?random=" . rand(1, 999),
                        'is_primary' => $j === 1
                    ]);
                }

                // Seed Biến thể với Màu sắc Ngẫu nhiên
                foreach (['M', 'L'] as $size) {
                    $product->variants()->create([
                        // Chọn ngẫu nhiên Trắng hoặc Đen
                        'color' => Arr::random($colors), 
                        'size' => $size,
                        'stock_quantity' => 10,
                        'sku' => $product->name . '-' . $size . '-' . rand(100, 999)
                    ]);
                }
            }
        }
    }
}

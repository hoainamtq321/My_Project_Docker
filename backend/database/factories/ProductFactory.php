<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = fake()->randomFloat(2, 100000, 1000000);
        return [
            'category_id' => \App\Models\Category::all()->random()->id,
            'name' => 'Ten gia thoi abc',
            'description'=> fake()->paragraphs(3, true),
            'base_price' => $price,
            'discount_price' => $price * 0.8,
            'discount_percent' => 20,
            'is_on_sale' => fake()->boolean(),
        ];
    }
}

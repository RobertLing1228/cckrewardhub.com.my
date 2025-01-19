<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = \App\Models\Product::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'price' => $this->faker->randomFloat(2, 1, 100), // Random price between 1.00 and 100.00
            'description' => $this->faker->sentence,
            'category' => $this->faker->word,
            'image' => $this->faker->imageUrl(640, 480, 'product'), // Random image URL
        ];
    }
}

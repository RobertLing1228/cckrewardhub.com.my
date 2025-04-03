<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Recipe;
use App\Models\Product;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('query');
        $prevPage = $request->input('prev', '/');

        // 搜索食谱
        $recipes = Recipe::where('title', 'LIKE', "%{$query}%")
                         ->orWhere('description', 'LIKE', "%{$query}%")
                         ->get()
                         ->map(fn($recipe) => [
                             'id' => $recipe->recipeID,
                             'name' => $recipe->title,
                             'type' => 'recipes',
                             'description' => $recipe->description
                         ]);

        // 搜索产品
        $products = Product::where('name', 'LIKE', "%{$query}%")
                   ->orWhere('description', 'LIKE', "%{$query}%")
                   ->get()
                   ->map(fn($product) => [
                       'id' => $product->productID, // Ensure correct ID field
                       'name' => $product->name,
                       'type' => 'products',
                       'description' => $product->description
                   ]);


        // 合并食谱和产品的搜索结果
        $results = $recipes->merge($products);

        return Inertia::render('Search', [
            'results' => $results,
            'query' => $query,
            'prev' => $prevPage
        ]);
    }
}

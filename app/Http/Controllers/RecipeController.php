<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    // Display all recipe
    public function index()
    {
        $recipe = Recipe::all();  // You can paginate if needed, for large datasets
        return Inertia::render('User/Recipes/Index', [
            'recipe' => $recipe,
        ]);
    }

    public function admin()
    {
        $recipe = Recipe::all();  // You can paginate if needed, for large datasets
        return Inertia::render('Admin/Recipes/Index', [
            'recipes' => $recipe,
        ]);
    }

    // Display a single recipe
    public function show($id)
    {
        $recipe = Recipe::findOrFail($id);
        return Inertia::render('User/Recipes/Show', [
            'recipe' => $recipe,
        ]);
    }

    // Show the form to create a new recipe
    public function create()
    {
        $products = Product::all();
        $categories = Recipe::select('category')->distinct()->pluck('category');
        return Inertia::render('Admin/Recipes/Create', ['categories' => $categories, 'products' => $products]);
    }

    // Store the new recipe
    public function store(Request $request)
    {
        $validated = $request->validate([
            'productID' => 'required|integer',
            'category' => 'required|string|max:100',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|array',
            'image.*' => 'image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);
    
         $imagePaths = [];

        foreach ($request->file('image') as $file) {
            $filename = $file->getClientOriginalName();
            $destination = public_path('storage/images/' . $filename);
            file_put_contents($destination, file_get_contents($file));
            $relativePath = 'images/' . $filename;
            $imagePaths[] = $relativePath;
        }

    
        Recipe::create([
            'productID' => $validated['productID'],
            'category' => $validated['category'],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'image' => json_encode($imagePaths),
        ]);

        return redirect('admin/recipes')->with('success', 'Recipe created successfully!');
    }

    // Show the form to edit a recipe
    public function edit($id)
    {
        $recipe = Recipe::findOrFail($id);
        $products = Product::all();
        $categories = Recipe::select('category')->distinct()->pluck('category');
        return inertia('Admin/Recipes/Edit', [
            'recipe' => $recipe,
            'categories' => $categories,
            'products' => $products
        ]);
    }

    // Update the recipe
    public function update(Request $request, Recipe $recipe)
    {
        $validated = $request->validate([
            'productID' => 'required|integer',
            'category' => 'required|string|max:100',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|array',
            'image.*' => 'image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);
    
        $imagePaths = [];
    
        if ($request->hasFile('image')) {
            // Delete old images
            $oldImages = json_decode($recipe->image, true);
            if (is_array($oldImages)) {
                foreach ($oldImages as $oldImage) {
                    if (file_exists(public_path("storage/{$oldImage}"))) {
                        unlink(public_path("storage/{$oldImage}"));
                    }
                }
            }

            foreach ($request->file('image') as $file) {
                $filename = $file->getClientOriginalName();
                $destination = public_path('storage/images/' . $filename);
    
                file_put_contents($destination, file_get_contents($file));
    
                $relativePath = 'images/' . $filename;
                $imagePaths[] = $relativePath;
                
            }

            $fields['image'] = json_encode(['images/' . $filename]);
        } else {
            // Keep existing images
            $fields['image'] = $recipe->image;
        }
    
        $recipe->update([
            'productID' => $validated['productID'],
            'category' => $validated['category'],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'image' => json_encode($imagePaths),
        ]);
    

        return redirect('admin/recipes')->with('success', 'Recipe updated successfully!');
    }

    // Delete the recipe
    public function delete($id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->delete();

        return redirect('admin/recipes')->with('success', 'Recipe deleted successfully!');
    }
}

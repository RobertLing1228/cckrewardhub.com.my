<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
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
        return Inertia::render('Admin/Recipes/Create');
    }

    // Store the new recipe
    public function store(Request $request)
    {
        $validated = $request->validate([
            'productID' => 'required|integer',
            'category' => 'required|string|max:100',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $imagePath = $request->file('image')->store('images', 'public');

        Recipe::create([
            'productID' => $validated['productID'],
            'category' => $validated['category'],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'image' => $imagePath

        ]);

        return redirect('admin/recipes')->with('success', 'Recipe created successfully!');
    }

    // Show the form to edit a recipe
    public function edit(Recipe $recipe)
    {
        return inertia('Admin/Recipes/Edit', [
            'recipe' => $recipe,
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
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($recipe->image && file_exists(public_path("storage/{$recipe->image}"))) {
                unlink(public_path("storage/{$recipe->image}"));
            }
    
            // Store new image
            $fields['image'] = $request->file('image')->store('images', 'public');
        } else {
            // Keep old image if no new file uploaded
            $fields['image'] = $recipe->image;
        }
        
        $recipe->update($validated);

        return redirect('admin/recipes')->with('success', 'Recipe updated successfully!');
    }

    // Delete the recipe
    public function destroy(Recipe $recipe)
    {
        $recipe->delete();

        return redirect('admin/recipes')->with('success', 'Recipe deleted successfully!');
    }
}

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
        return Inertia::render('Recipes/Index', [
            'recipe' => $recipe,
        ]);
    }

    // Display a single recipe
    public function show($id)
    {
        $recipe = Recipe::findOrFail($id);
        return Inertia::render('Recipes/Show', [
            'recipe' => $recipe,
        ]);
    }

    // Show the form to create a new recipe
    public function create()
    {
        return Inertia::render('Recipes/Create');
    }

    // Store the new recipe
    public function store(Request $request)
    {
        $validated = $request->validate([
            'productID' => 'required|integer',
            'category' => 'required|string|max:100',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
        ]);

        Recipe::create($validated);

        return redirect()->route('recipes.index')->with('success', 'Recipe created successfully!');
    }

    // Show the form to edit a recipe
    public function edit($id)
    {
        $recipe = Recipe::findOrFail($id);
        return Inertia::render('Recipes/Edit', [
            'recipe' => $recipe,
        ]);
    }

    // Update the recipe
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'productID' => 'required|integer',
            'category' => 'required|string|max:100',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
        ]);

        $recipe = Recipe::findOrFail($id);
        $recipe->update($validated);

        return redirect()->route('recipes.index')->with('success', 'Recipe updated successfully!');
    }

    // Delete the recipe
    public function destroy($id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->delete();

        return redirect()->route('recipes.index')->with('success', 'Recipe deleted successfully!');
    }
}

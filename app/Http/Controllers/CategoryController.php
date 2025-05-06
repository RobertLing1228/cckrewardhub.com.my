<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Categories;

class CategoryController extends Controller
{
    public function admin(){
        $categories = Categories::all();
        return Inertia::render('Admin/Categories/Index', ['categories' => $categories]);
    }

    public function create(){
        return Inertia::render('Admin/Categories/Add');
    }

    public function store(Request $request){
        $request->validate([
            'categoryName' => 'required|string|max:255',
        ]);

        Categories::create([
            'categoryName' => $request->categoryName,
        ]);

        return redirect('/admin/categories')->with('success', 'Category created successfully!');
    }

    public function edit($id){
        $category = Categories::find($id);
        return Inertia::render('Admin/Categories/Edit', ['category' => $category]);
    }

    public function update(Request $request, $id){
        $request->validate([
            'categoryName' => 'required|string|max:255',
        ]);

        $category = Categories::find($id);
        $category->update([
            'categoryName' => $request->categoryName,
        ]);

        return redirect('/admin/categories')->with('success', 'Category updated successfully!');
    }

    public function delete($id){
        $category = Categories::find($id);
        $category->delete();
        return redirect('/admin/categories')->with('success', 'Category deleted successfully!');
    }
}

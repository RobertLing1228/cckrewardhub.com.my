<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Categories;
use App\Models\Recipe;
use App\Models\Promotion;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function home()
    {
        $product = Product::orderBy('name', 'asc')->take(6)->get();
        $recipe = Recipe::orderBy('title', 'asc')->take(6)->get();
        $promotion = Promotion::orderBy('title', 'asc')->take(6)->get();
        return Inertia::render('Home', ['product' => $product, 'recipe' => $recipe, 'promotion' => $promotion]);
    }

    public function index(Request $request)
    {

        $categories = Categories::all();

        $query = Product::query()
        ->join('categories', 'products.category', '=', 'categories.categoryID')
        ->select('products.*', 'categories.categoryName as category_name')
        ->orderBy('products.name', 'asc');

        // Search by name
        if ($request->filled('search')) {
            $query->where('products.name', 'like', '%' . $request->search . '%');
        }

        // Filter by category
        if ($request->filled('category') && $request->category !== "") {
            $query->where('products.category', (int)$request->category); // Cast to integer
        }

        $products = $query->paginate(10);

        $filters = [
            'search' => $request->filled('search') ? $request->search : null,
            'category' => $request->filled('category') ? $request->category : null,
        ];

        return Inertia::render('User/Products/Index', [
            'products' => $products,
            'filters' => $filters,
            'categories' => $categories,
        ]);
    }

    public function admin()
    {
        $product = Product::all();
        return Inertia::render('Admin/Products/Index', ['products' => $product]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Categories::all();
        return Inertia::render('Admin/Products/Create', ['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'category' => 'nullable|integer',
            'image' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $imagePath = $request->file('image')->store('images', 'public');

        $product = Product::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'description' => $validated['description'],
            'category' => $validated['category'],
            'image' => $imagePath
        ]);

        return redirect('/admin/products')->with('success', 'Product created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Fetch the product with its category name
        $product = Product::query()
            ->join('categories', 'products.category', '=', 'categories.categoryID')
            ->select('products.*', 'categories.categoryName as category_name')
            ->where('products.productID', $id)
            ->firstOrFail();

        return Inertia::render('User/Products/Show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Categories::all();
        return inertia('Admin/Products/Edit', ['product' => $product, 'categories' => $categories]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {

        $fields = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric',
            'description' => 'sometimes|required|string',
            'category' => 'sometimes|nullable|integer',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($product->image && file_exists(public_path("storage/{$product->image}"))) {
                unlink(public_path("storage/{$product->image}"));
            }
    
            // Store new image
            $fields['image'] = $request->file('image')->store('images', 'public');
        } else {
            // Keep old image if no new file uploaded
            $fields['image'] = $product->image;
        }

        $product->update($fields);

        return redirect('admin/products')->with('success', 'Product updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Product $product)
    {
        $product->delete();

        return redirect('/admin/products')->with('success', 'Game deleted successfully!');
    }
}

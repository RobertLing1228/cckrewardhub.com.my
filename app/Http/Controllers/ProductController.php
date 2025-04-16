<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Branch;
use App\Models\Categories;
use App\Models\Recipe;
use App\Models\Promotion;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display homepage with limited products, recipes, and promotions.
     */
    public function home()
    {
        $product = Product::orderBy('name', 'asc')->take(6)->get();
        $recipe = Recipe::orderBy('title', 'asc')->take(6)->get();
        $promotion = Promotion::orderBy('title', 'asc')->take(6)->get();
        
        return Inertia::render('Home', [
            'product' => $product, 
            'recipe' => $recipe, 
            'promotion' => $promotion, 
            'user' => auth()->check() ? auth()->user() : null
        ]);
    }

    /**
     * Display product listing with branch and category filtering.
     */
    public function index(Request $request)
    {
        $categories = Categories::all();
        $branches = Branch::all(); // Fetch all branches
    
        $products = Product::query()
            ->join('categories', 'products.category', '=', 'categories.categoryID')
            ->select('products.*', 'categories.categoryName as category_name')
            ->orderBy('products.name', 'asc');
    
        //  Search by product name
        if ($request->filled('search')) {
            $products->where('products.name', 'like', '%' . $request->search . '%');
        }
    
        //  Filter by category
        if ($request->filled('category') && $request->category !== "") {
            $products->where('products.category', (int) $request->category);
        }
    
        //  Filter by branch and ensure stock is available
        if ($request->filled('branch_id')) {
            $branch_id = (int) $request->branch_id;
            $products->whereIn('products.productID', function ($query) use ($branch_id) {
                $query->select('productID')
                    ->from('branch_product')
                    ->where('branch_id', $branch_id)
                    ->where('stock', '>', 0);
            });
        }
    
        return Inertia::render('User/Products/Index', [
            'products' => $products->get(),
            'filters' => [
                'search' => $request->search ?? null,
                'category' => $request->category ?? null,
                'branch_id' => $request->branch_id ?? null
            ],
            'categories' => $categories,
            'branches' => $branches
        ]);
    }

    /**
     * Show admin product management page.
     */
    public function admin()
    {
        $products = Product::all();
        return Inertia::render('Admin/Products/Index', ['products' => $products]);
    }

    /**
     * Show product creation form.
     */
    public function create()
    {
        $categories = Categories::all();
        $branches = Branch::all();
        return Inertia::render('Admin/Products/Create', ['categories' => $categories, 'branches' => $branches]);
    }

    /**
     * Store a new product.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'category' => 'nullable|integer',
            'branch_id' => 'required|integer', // Ensure branch selection
            'image' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $imagePath = $request->file('image')->store('images', 'public');

        Product::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'description' => $validated['description'],
            'category' => $validated['category'],
            'branch_id' => $validated['branch_id'], // Assign product to branch
            'image' => $imagePath
        ]);

        return redirect('/admin/products')->with('success', 'Product created successfully!');
    }

    /**
     * Display a single product.
     */
    public function show($id)
    {
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
     * Show edit form.
     */
    public function edit(Product $product)
    {
        $categories = Categories::all();
        $branches = Branch::all();
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product, 
            'categories' => $categories,
            'branches' => $branches
        ]);
    }

    /**
     * Update a product.
     */
    public function update(Request $request, Product $product)
    {
        $fields = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric',
            'description' => 'sometimes|required|string',
            'category' => 'sometimes|nullable|integer',
            'branch_id' => 'sometimes|required|integer', // Ensure branch is updated
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image && file_exists(public_path("storage/{$product->image}"))) {
                unlink(public_path("storage/{$product->image}"));
            }
    
            $fields['image'] = $request->file('image')->store('images', 'public');
        } else {
            $fields['image'] = $product->image;
        }

        $product->update($fields);

        return redirect('/admin/products')->with('success', 'Product updated successfully!');
    }

    /**
     * Delete a product.
     */
    public function delete(Product $product)
    {
        $product->delete();

        return redirect('/admin/products')->with('success', 'Product deleted successfully!');
    }
}


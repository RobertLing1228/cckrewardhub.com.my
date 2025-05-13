<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Branch;
use App\Models\BranchProduct;
use App\Models\Categories;
use App\Models\Recipe;
use App\Models\Promotion;
use App\Models\Banner;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductController extends Controller
{
    /**
     * Display homepage with limited products, recipes, and promotions.
     */
   public function home()
{
    $product = Product::where('itemHot', true)->orderBy('name')->take(6)->get();
    $recipe = Recipe::orderBy('title')->take(6)->get();
    $promotion = Promotion::orderBy('title')->take(6)->get();
    $banners = Banner::all();

    return Inertia::render('Home', [
        'product' => $product,
        'recipe' => $recipe,
        'promotion' => $promotion,
        'banners' => $banners,
        'user' => auth()->check() ? auth()->user() : null
    ]);
}
    /**
     * Display product listing with branch and category filtering.
     */
   public function index(Request $request)
{
    $categories = Categories::all();
    $branches = Branch::all();

    $products = Product::query()
        ->join('categories', 'products.category', '=', 'categories.categoryID')
        ->select('products.*', 'categories.categoryName as category_name')
        ->orderBy('products.name', 'asc');

    if ($request->filled('search')) {
        $products->where('products.name', 'like', '%' . $request->search . '%');
    }

    if ($request->filled('category') && $request->category !== "") {
        $products->where('products.category', (int) $request->category);
    }

    if ($request->filled('branch_id')) {
        $branch_id = (int) $request->branch_id;
        $products->whereIn('products.productID', function ($query) use ($branch_id) {
            $query->select('productID')
                ->from('branch_product')
                ->where('branch_id', $branch_id)
                ->where('stock', '>', 0);
        });
    }

    $paginatedProducts = $products->paginate(12)->withQueryString(); // 👈 paginate!

    return Inertia::render('User/Products/Index', [
        'products' => $paginatedProducts,
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
        $branched_product = BranchProduct::all();
        return Inertia::render('Admin/Products/Index', ['products' => $products, 'branched_products' => $branched_product]);
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
            'image' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
            'itemHot' => 'nullable|boolean'
        ]);


        $imagePath = $request->file('image')->store('images', 'public');

        Product::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'description' => $validated['description'],
            'category' => $validated['category'],
            'image' => $imagePath,
            'itemHot' => $validated['itemHot']
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

        $branch_stock = DB::table('branch_product')
        ->join('branches', 'branch_product.branch_id', '=', 'branches.id')
        ->select('branches.name as branch_name', 'branch_product.stock')
        ->where('branch_product.productID', $id)
        ->get();

        return Inertia::render('User/Products/Show', [
            'product' => $product,
            'branch_stock' => $branch_stock,
        ]);
    }

    /**
     * Show edit form.
     */
    public function edit(Product $product)
    {
        $categories = Categories::all();
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product, 
            'categories' => $categories,
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
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'itemHot' => 'nullable|boolean'
        ]);

        if ($request->hasFile('image')) {
            if ($product->image && file_exists(public_path("storage/{$product->image}"))) {
                unlink(public_path("storage/{$product->image}"));
            }
    
            $fields['image'] = $request->file('image')->store('images', 'public');
        } else {
            $fields['image'] = $product->image;
        }

        $product->update([
            'name' => $fields['name'],
            'price' => $fields['price'],
            'description' => $fields['description'],
            'category' => $fields['category'],
            'image' => $fields['image'],
            'itemHot' => $fields['itemHot']
        ]);

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


<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $promotion = Promotion::all();

        // Return the view for promotion index, passing promotion data
        return Inertia::render('User/Promotions/Index', ['promotion' => $promotion,]);
    }

    public function admin()
    {
        $promotion = Promotion::all();

        // Return the view for promotion index, passing promotion data
        return Inertia::render('Admin/Promotions/Index', ['promotions' => $promotion,]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Return the view for creating a promotion
        return Inertia::render('Admin/Promotions/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $field = $request->validate([
            'productID' => 'required|integer|exists:products,productID',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date|before_or_equal:end_date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'code' => 'required|string|max:32',
        ]);

        Promotion::create([
            'productID' => $field['productID'],
            'title' => $field['title'],
            'description' => $field['description'],
            'start_date' => $field['start_date'],
            'end_date' => $field['end_date'],
            'code' => $field['code'],
        ]);

        // Redirect to the promotion index route using Ziggy
        return redirect('admin/promotions')->with('success', 'Promotion created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Promotion $promotion)
    {
        // Fetch the associated product for the promotion
        $product = Product::find($promotion->productID);

        return Inertia::render('User/Promotions/Show', [
            'promotion' => $promotion,
            'product' => $product, // Pass the product to the view
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Promotion $promotion)
    {
        // Return the view for editing a promotion
        return Inertia::render('Admin/Promotions/Edit', ['promotion' => $promotion]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Promotion $promotion)
    {
        $fields = $request->validate([
            'productID' => 'required|integer|exists:products,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date|before_or_equal:end_date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'code' => 'required|string|max:32',
        ]);

        $promotion->update($fields);

        // Redirect to the promotion index route using Ziggy
        return redirect('admin/promotions')->with('success', 'Promotion updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Promotion $promotion)
    {
        $promotion->delete();

        // Redirect to the promotion index route using Ziggy
        return redirect('admin/promotions')->with('success', 'Promotion deleted successfully.');
    }
}


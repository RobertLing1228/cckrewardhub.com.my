<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
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
        return Inertia::render('Promotions/Index', ['promotion' => $promotion,]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Return the view for creating a promotion
        return inertia('Promotions/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'productID' => 'required|integer|exists:products,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date|before_or_equal:end_date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'code' => 'required|string|max:32',
        ]);

        Promotion::create($request->all());

        // Redirect to the promotion index route using Ziggy
        return redirect()->route('promotions.index')->with('success', 'Promotion created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Promotion $promotion)
    {
        // Return the view for showing a single promotion
        return inertia('Promotions/Show', ['promotion' => $promotion]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Promotion $promotion)
    {
        // Return the view for editing a promotion
        return inertia('Promotions/Edit', ['promotion' => $promotion]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Promotion $promotion)
    {
        $request->validate([
            'productID' => 'required|integer|exists:products,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date|before_or_equal:end_date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'code' => 'required|string|max:32',
        ]);

        $promotion->update($request->all());

        // Redirect to the promotion index route using Ziggy
        return redirect()->route('promotions.index')->with('success', 'Promotion updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Promotion $promotion)
    {
        $promotion->delete();

        // Redirect to the promotion index route using Ziggy
        return redirect()->route('promotions.index')->with('success', 'Promotion deleted successfully.');
    }
}


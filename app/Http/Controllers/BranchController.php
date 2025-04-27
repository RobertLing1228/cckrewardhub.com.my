<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\BranchProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchController extends Controller
{
    public function admin(){
        $branches = Branch::all();
        $branched_products = BranchProduct::all();
        return Inertia::render('Admin/Branches/Index', ['branches' => $branches, 'branched_products' => $branched_products]);
    }

    public function createBranch(){
        return Inertia::render('Admin/Branches/AddBranch');
    }

    public function storeBranch(Request $request){
        $request->validate([
            'name' => 'required',
        ]);

        Branch::create([
            'name' => $request->name,
        ]);

        return redirect('/admin/branches')->with('success', 'Branch created successfully!');
    }

    public function deleteBranch(Branch $branch){
        $branch->delete();
        return redirect('/admin/branches')->with('success', 'Branch deleted successfully!');
    }

    public function editBranch(Branch $branch){
        return Inertia::render('Admin/Branches/EditBranch', ['branch' => $branch]);
    }

    public function updateBranch(Request $request, Branch $branch){
        $request->validate([
            'name' => 'required',
        ]);

        $branch->update([
            'name' => $request->name,
        ]);

        return redirect('/admin/branches')->with('success', 'Branch updated successfully!');
    }

    public function createBranchProduct(){
        $branches = Branch::all();
        $products = Product::all();
        return Inertia::render('Admin/Branches/AddBranchProduct', ['branches' => $branches, 'products' => $products]);
    }

    public function storeBranchProduct(Request $request){
        $request->validate([
            'productID' => 'required|integer|exists:products,productID',
            'branch_id' => 'required|exists:branches,id',
            'stock' => 'required|integer',
        ]);

        BranchProduct::create([
            'productID' => $request->productID,
            'branch_id' => $request->branch_id,
            'stock' => $request->stock,
        ]);

        return redirect('/admin/branches')->with('success', 'Branch product created successfully!');
    }

    public function editBranchProduct($id){
        $branchProduct = BranchProduct::find($id);
        $branches = Branch::all();
        $products = Product::all();
        return Inertia::render('Admin/Branches/EditBranchProduct', ['branchProduct' => $branchProduct, 'branches' => $branches, 'products' => $products]);
    }

    public function updateBranchProduct(Request $request, $id){
        $branchProduct = BranchProduct::find($id);

        $request->validate([
            'productID' => 'required|exists:products,productID',
            'branch_id' => 'required|exists:branches,id',
            'stock' => 'required|integer',
        ]);

        $branchProduct->update([
            'productID' => $request->productID,
            'branch_id' => $request->branch_id,
            'stock' => $request->stock,
        ]);

        return redirect('/admin/branches')->with('success', 'Branch product updated successfully!');
    }

    public function deleteBranchProduct($id){
        $branchProduct = BranchProduct::find($id);
        $branchProduct->delete();
        return redirect('/admin/branches')->with('success', 'Branch product deleted successfully!');
    }
}

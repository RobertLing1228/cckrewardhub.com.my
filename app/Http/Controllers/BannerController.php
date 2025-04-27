<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Banner;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function admin()
    {
        $banners = Banner::all();
        return Inertia::render('Admin/Banners/Index', ['banners' => $banners]);
    }

    public function create()
    {
        return Inertia::render('Admin/Banners/Add');
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'image_path' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
            'link' => 'required|string|max:255',
        ]);

        $imagePath = $request->file('image_path')->store('images', 'public');

        Banner::create([
            'image_path' => $imagePath,
            'link' => $fields['link'],
        ]);

        return redirect('/admin/banners')->with('success', 'Banner created successfully!');
    }

    public function edit($id)
    {
        $banner = Banner::find($id);
        return Inertia::render('Admin/Banners/Edit', ['banner' => $banner]);
    }

    public function update(Request $request, $id)
    {

        $banner = Banner::find($id);

        $fields = $request->validate([
            'image_path' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'link' => 'required|string|max:255',
        ]);


        if ($request->hasFile('image_path')) {
            if ($banner->image_path && file_exists(public_path("storage/{$banner->image_path}"))) {
                unlink(public_path("storage/{$banner->image_path}"));
            }
    
            $fields['image_path'] = $request->file('image_path')->store('images', 'public');
        } else {
            $fields['image_path'] = $banner->image_path;
        }

        

        $banner->update([
            'image_path' => $fields['image_path'],
            'link' => $fields['link'],
        ]);

        return redirect('/admin/banners')->with('success', 'Banner updated successfully!');
    }

    public function delete($id){
        $banner = Banner::find($id);
        $banner->delete();
        return redirect('/admin/banners')->with('success', 'Banner deleted successfully!');
    }
}

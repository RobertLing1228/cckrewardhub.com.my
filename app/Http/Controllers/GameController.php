<?php

namespace App\Http\Controllers;

use App\Models\Games;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GameController extends Controller
{
    public function admin(){
        $game = Games::all();

        return inertia('Admin/Games/Index', ['games' => $game]);
    }

    public function index(){
        $game = Games::all();
        return inertia('User/Games/Index', ['games' => $game]);
    }

    public function create()
    {
        return inertia('Admin/Games/Add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
            'gameLink' => 'required|string',
        ]);

        $file = $request->file('image');
        $filename = $file->getClientOriginalName();
        $destination = public_path('storage/images/' . $filename);

        file_put_contents($destination, file_get_contents($file));

        $relativePath = 'images/' . $filename;

        Games::create([
            'title' => $fields['title'],
            'description' => $fields['description'],
            'image' => $relativePath,
            'gameLink' => $fields['gameLink'],
        ]);

        return redirect('/admin/games')->with('success', 'Game created successfully!');
    }

    public function edit(Games $game){
        return inertia('Admin/Games/Edit', ['game' => $game]);
    }

    public function update(Request $request, Games $game){

        $fields = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'gameLink' => 'required|string',
        ]);

        // Check if a new image is uploaded
        if ($request->hasFile('image')) {
                if ($game->image && file_exists(public_path($game->image))) {
                    unlink(public_path($game->image));
                }
        
                // Read & write the new image manually
                $file = $request->file('image');
                $filename = $file->getClientOriginalName(); // Optional: use a UUID to avoid name collision
                $destination = public_path('storage/images/' . $filename);

                file_put_contents($destination, file_get_contents($file));

                $fields['image'] = 'images/' . $filename;
            } else {
                $fields['image'] = $game->image;
            }

        $game->update($fields);

        return redirect('/admin/games')->with('success', 'Game updated successfully!');
    }

    public function delete(Games $game){
        // Delete image file from storage
        if ($game->image && file_exists(public_path("storage/{$game->image}"))) {
            unlink(public_path("storage/{$game->image}"));
        }
        
        $game->delete();
        return redirect('/admin/games')->with('success', 'Game deleted successfully!');
    }
}

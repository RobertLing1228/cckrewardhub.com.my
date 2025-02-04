<?php

namespace App\Http\Controllers;

use App\Models\Games;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function admin(){
        $game = Games::all();
        return inertia('Admin/Games', ['games' => $game]);
    }
}

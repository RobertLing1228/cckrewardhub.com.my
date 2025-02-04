<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GameController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*
Base Pages
*/
Route::get('/', [ProductController::class, 'index'])->name('index');

Route::get('/admin', function () {
    return Inertia::render('Admin/Dashboard');
});

Route::get('/admin/products', [ProductController::class, 'admin']);
Route::get('/admin/recipes', [RecipeController::class, 'admin']);
Route::get('/admin/promotions', [PromotionController::class, 'admin']);
Route::get('/admin/users', [UserController::class, 'admin']);
Route::get('/admin/games', [GameController::class, 'admin']);

Route::get('/base', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*
Recipies
*/

Route::get('/recipes', [RecipeController::class, 'index'])->name('recipes.index');
Route::get('/recipes/{id}', [RecipeController::class, 'show'])->name('recipes.show');
Route::get('/recipes/create', [RecipeController::class, 'create'])->name('recipes.create');
Route::post('/recipes', [RecipeController::class, 'store'])->name('recipes.store');
Route::get('/recipes/{id}/edit', [RecipeController::class, 'edit'])->name('recipes.edit');
Route::put('/recipes/{id}', [RecipeController::class, 'update'])->name('recipes.update');
Route::delete('/recipes/{id}', [RecipeController::class, 'destroy'])->name('recipes.destroy');

/*
Promotions
*/

Route::get('/promotions', [PromotionController::class, 'index'])->name('promotions.index');
Route::get('/promotions/{id}', [PromotionController::class, 'show'])->name('promotion.show');
Route::get('/promotions/create', [PromotionController::class, 'create'])->name('promotions.create');
Route::post('promotions', [PromotionController::class, 'store'])->name('promotions.store');
Route::get('/promotions/{id}/edit', [PromotionController::class, 'edit'])->name('promotions.edit');
Route::put('/promotions/{id}', [PromotionController::class, 'update'])->name('promotions.update');
Route::delete('/promotions/{id}', [PromotionController::class, 'destroy'])->name('promotions.destroy');



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

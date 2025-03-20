<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VoucherController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\AdminAuthController;

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

Route::middleware('auth')->group(function () {
    Route::get('/', [ProductController::class, 'home'])->name('home');  

});

Route::get('/test', function(){
    return Inertia::render('Test');
});


Route::get('/games', [GameController::class, 'index']);
Route::get('/play', function(){
    return Inertia::render('User/Games/Play');
});
Route::post('/check-member', [UserController::class, 'checkMember']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/recipes', [RecipeController::class, 'index']);
Route::get('/promotions', [PromotionController::class, 'index']);
Route::get('/vouchers', [VoucherController::class, 'index']);


Route::middleware(['auth:admin'])->group(function () {
    Route::get('/admin', function(){
        return Inertia::render('Admin/Dashboard', ['admin' => Auth::guard('admin')->user()]);
    })->name('admin.dashboard');
});

Route::get('/admin/products', [ProductController::class, 'admin']);
Route::get('/admin/products/add', [ProductController::class, 'create']);
Route::post('/admin/products/add', [ProductController::class, 'store'])->name('products.store');
Route::delete('admin/products/{product}', [ProductController::class, 'delete'])->name('products.delete');
Route::get('/admin/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
Route::post('admin/products/{product}', [ProductController::class, 'update'])->name('products.update');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');




Route::get('/admin/recipes', [RecipeController::class, 'admin']);
Route::get('/admin/recipes/add', [RecipeController::class, 'create']);
Route::post('/admin/recipes/add', [RecipeController::class, 'store'])->name('recipes.store');
Route::delete('admin/recipes/{recipe}', [RecipeController::class, 'delete'])->name('recipes.delete');
Route::get('/admin/recipes/{recipe}/edit', [RecipeController::class, 'edit'])->name('recipes.edit');
Route::post('admin/recipes/{recipe}', [RecipeController::class, 'update'])->name('recipes.update');
Route::get('/recipes/{recipe}', [RecipeController::class, 'show'])->name('recipes.show');



Route::get('/admin/promotions', [PromotionController::class, 'admin']);
Route::get('/admin/promotions/add', [PromotionController::class, 'create']);
Route::post('/admin/promotions/add', [PromotionController::class, 'store'])->name('promotions.store');
Route::delete('admin/promotions/{promotion}', [PromotionController::class, 'delete'])->name('promotions.delete');
Route::get('/admin/promotions/{promotion}/edit', [PromotionController::class, 'edit'])->name('promotions.edit');
Route::post('admin/promotions/{promotion}', [PromotionController::class, 'update'])->name('promotions.update');
Route::get('/promotions/{promotion}', [PromotionController::class, 'show'])->name('promotions.show');



Route::get('/admin/users', [UserController::class, 'admin']);



Route::get('/admin/games', [GameController::class, 'admin']);
Route::delete('admin/games/{game}', [GameController::class, 'delete'])->name('games.delete');
Route::get('/admin/games/add', [GameController::class, 'create']);
Route::post('/admin/games/add', [GameController::class, 'store'])->name('games.store');
Route::get('/admin/games/{game}/edit', [GameController::class, 'edit'])->name('games.edit'); 
Route::post('/admin/games/{game}', [GameController::class, 'update'])->name('games.update');


Route::get('/base', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});









Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

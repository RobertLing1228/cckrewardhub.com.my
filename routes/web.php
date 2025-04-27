<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\WheelRewardController;
use App\Http\Controllers\QRCodeController;
use App\Http\Controllers\UserMissionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Middleware\AdminAuthMiddleware;
use App\Http\Controllers\ClaimController;
use App\Http\Controllers\UserVoucherController;
use App\Http\Controllers\ResetTimeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\FileImportController;
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
Route::get('/', [ProductController::class, 'home'])->name('home'); 
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

Route::get('/recipes', [RecipeController::class, 'index']);
Route::get('/recipes/{recipe}', [RecipeController::class, 'show'])->name('recipes.show');

Route::get('/promotions', [PromotionController::class, 'index']);
Route::get('/promotions/{promotion}', [PromotionController::class, 'show'])->name('promotions.show');



Route::get('/test', function(){
    return Inertia::render('Test');
});

//Auth pages
Route::middleware('auth')->group(function () {
    Route::get('/games', [GameController::class, 'index']);
    Route::get('/play', function(){
        return Inertia::render('User/Games/Play');
    });
    Route::post('/check-member', [UserController::class, 'checkMember']);
    Route::get('/vouchers', [VoucherController::class, 'index']);
    Route::get('/vouchers/{voucher}', [VoucherController::class, 'show'])->name('vouchers.show');
    Route::post('/vouchers/{voucher}/mark-as-used', [VoucherController::class, 'markAsUsed'])->name('vouchers.mark-as-used');
    Route::post('/claim', [ClaimController::class, 'claim'])->name('claim');

    // Mission Routes
    Route::get('/missions', [MissionController::class, 'index']);
    Route::get('/missions/{id}/progress', [MissionController::class, 'getProgress']);
    Route::post('/missions/{id}/progress', [MissionController::class, 'updateProgress']);

    // User Missions Initialization
    Route::post('/user-missions/start', [UserMissionController::class, 'start']); // Create user missions if they don't exist

    // Wheel Reward Routes
    Route::get('/wheel-rewards', [WheelRewardController::class, 'index']);

    // QR Code Routes
    Route::post('/scan', [QRCodeController::class, 'scan']);
});

Route::middleware([AdminAuthMiddleWare::class])->group(function () {
    Route::get('/admin', [DashboardController::class, 'dashboard'])->name('admindashboard'); 

    Route::get('/admin/products', [ProductController::class, 'admin']);
    Route::get('/admin/products/add', [ProductController::class, 'create']);
    Route::post('/admin/products/add', [ProductController::class, 'store'])->name('products.store');
    Route::delete('/admin/products/{product}', [ProductController::class, 'delete'])->name('products.delete');
    Route::get('/admin/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::post('/admin/products/{product}', [ProductController::class, 'update'])->name('products.update');

    Route::get('/admin/branches', [BranchController::class, 'admin']);
    Route::get('/admin/branches/add', [BranchController::class, 'createBranch']);
    Route::post('/admin/branches/add', [BranchController::class, 'storeBranch'])->name('branches.store');
    Route::delete('/admin/branches/{branch}', [BranchController::class, 'deleteBranch'])->name('branches.delete');
    Route::get('/admin/branches/{branch}/edit', [BranchController::class, 'editBranch'])->name('branches.edit');
    Route::post('/admin/branches/{branch}', [BranchController::class, 'updateBranch'])->name('branches.update');
    Route::get('/admin/branchproduct/add', [BranchController::class, 'createBranchProduct']);
    Route::post('/admin/branchproduct/add', [BranchController::class, 'storeBranchProduct'])->name('branchproduct.store');
    Route::delete('/admin/branchproduct/{branchproduct}', [BranchController::class, 'deleteBranchProduct'])->name('branchproduct.delete');
    Route::get('/admin/branchproduct/{branchproduct}/edit', [BranchController::class, 'editBranchProduct'])->name('branchproduct.edit');
    Route::post('/admin/branchproduct/{branchproduct}', [BranchController::class, 'updateBranchProduct'])->name('branchproduct.update');

    Route::get('/admin/recipes', [RecipeController::class, 'admin']);
    Route::get('/admin/recipes/add', [RecipeController::class, 'create']);
    Route::post('/admin/recipes/add', [RecipeController::class, 'store'])->name('recipes.store');
    Route::delete('/admin/recipes/{recipe}', [RecipeController::class, 'delete'])->name('recipes.delete');
    Route::get('/admin/recipes/{recipe}/edit', [RecipeController::class, 'edit'])->name('recipes.edit');
    Route::post('/admin/recipes/{recipe}', [RecipeController::class, 'update'])->name('recipes.update');

    Route::get('/admin/promotions', [PromotionController::class, 'admin']);
    Route::get('/admin/promotions/add', [PromotionController::class, 'create']);
    Route::post('/admin/promotions/add', [PromotionController::class, 'store'])->name('promotions.store');
    Route::delete('/admin/promotions/{promotion}', [PromotionController::class, 'delete'])->name('promotions.delete');
    Route::get('/admin/promotions/{promotion}/edit', [PromotionController::class, 'edit'])->name('promotions.edit');
    Route::post('/admin/promotions/{promotion}', [PromotionController::class, 'update'])->name('promotions.update');

    Route::get('/admin/users', [UserController::class, 'admin']);
    Route::get('/admin/users/add', [UserController::class, 'create']);
    Route::post('/admin/users/add', [UserController::class, 'store'])->name('users.store');
    Route::delete('/admin/users/{user}', [UserController::class, 'delete'])->name('users.delete');
    Route::get('/admin/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::post('/admin/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::post('/admin/reset-password/{admin}', [UserController::class, 'resetPassword'])->name('admin.reset-password');

    Route::get('/admin/profile', [UserController::class, 'profile'])->name('admin.profile');
    Route::post('/admin/profile', [UserController::class, 'updateProfile'])->name('admin.profile.update');

    Route::get('/admin/claims', [ClaimController::class, 'index'])->name('admin.claims');
    Route::post('/admin/claims', [ClaimController::class, 'update'])->name('admin.claims.update');
    Route::delete('/admin/claims/{claim}', [ClaimController::class, 'delete'])->name('admin.claims.delete');

    Route::get('/admin/games', [GameController::class, 'admin']);
    Route::delete('/admin/games/{game}', [GameController::class, 'delete'])->name('games.delete');
    Route::get('/admin/games/add', [GameController::class, 'create']);
    Route::post('/admin/games/add', [GameController::class, 'store'])->name('games.store');
    Route::get('/admin/games/{game}/edit', [GameController::class, 'edit'])->name('games.edit'); 
    Route::post('/admin/games/{game}', [GameController::class, 'update'])->name('games.update');

    Route::get('/admin/vouchers', [VoucherController::class, 'admin']);
    Route::delete('/admin/vouchers/{voucher}', [VoucherController::class, 'delete'])->name('vouchers.delete');
    Route::get('/admin/vouchers/add', [VoucherController::class, 'create']);
    Route::post('/admin/vouchers/add', [VoucherController::class, 'store'])->name('vouchers.store');
    Route::get('/admin/vouchers/{voucher}/edit', [VoucherController::class, 'edit'])->name('vouchers.edit');
    Route::post('/admin/vouchers/{voucher}', [VoucherController::class, 'update'])->name('vouchers.update');
    

    Route::get('/admin/uservouchers', [UserVoucherController::class, 'admin']);

    Route::get('/admin/missions', [MissionController::class, 'admin']);
    Route::delete('/admin/missions/{mission}', [MissionController::class, 'delete'])->name('missions.delete');
    Route::get('/admin/missions/add', [MissionController::class, 'create']);
    Route::post('/admin/missions/add', [MissionController::class, 'store'])->name('missions.store');
    Route::get('/admin/missions/{mission}/edit', [MissionController::class, 'edit'])->name('missions.edit');
    Route::post('/admin/missions/{mission}', [MissionController::class, 'update'])->name('missions.update');

    Route::get('/admin/usermissions', [UserMissionController::class, 'admin']);
    Route::get('/admin/usermissions/add', [UserMissionController::class, 'create']);
    Route::post('/admin/usermissions/add', [UserMissionController::class, 'store'])->name('usermissions.store');
    Route::get('/admin/usermissions/{usermission}/edit', [UserMissionController::class, 'edit'])->name('usermissions.edit');
    Route::post('/admin/usermissions/{usermission}', [UserMissionController::class, 'update'])->name('usermissions.update');
    Route::delete('/admin/usermissions/{usermission}', [UserMissionController::class, 'delete'])->name('usermissions.delete');

    Route::get('/admin/wheelrewards', [WheelRewardController::class, 'admin']);
    Route::get('/admin/wheelrewards/add', [WheelRewardController::class, 'create']);
    Route::post('/admin/wheelrewards/add', [WheelRewardController::class, 'store'])->name('wheelrewards.store');
    Route::get('/admin/wheelrewards/{wheelreward}/edit', [WheelRewardController::class, 'edit'])->name('wheelrewards.edit');
    Route::post('/admin/wheelrewards/{wheelreward}', [WheelRewardController::class, 'update'])->name('wheelrewards.update');
    Route::delete('/admin/wheelrewards/{wheelreward}', [WheelRewardController::class, 'delete'])->name('wheelrewards.delete');

    Route::get('/admin/qrcodes', [QrCodeController::class, 'admin']);
    Route::get('/admin/qrcodes/add', [QrCodeController::class, 'create']);
    Route::post('/admin/qrcodes/add', [QrCodeController::class, 'store'])->name('qrcodes.store');
    Route::get('/admin/qrcodes/{qrcode}/edit', [QrCodeController::class, 'edit'])->name('qrcodes.edit');
    Route::post('/admin/qrcodes/{qrcode}', [QrCodeController::class, 'update'])->name('qrcodes.update');
    Route::delete('/admin/qrcodes/{qrcode}', [QrCodeController::class, 'delete'])->name('qrcodes.delete');

    Route::get('/admin/resettimes', [ResetTimeController::class, 'admin']);
    Route::get('/admin/resettimes/add', [ResetTimeController::class, 'create']);
    Route::post('/admin/resettimes/add', [ResetTimeController::class, 'store'])->name('resettimes.store');
    Route::get('/admin/resettimes/{resettimes}/edit', [ResetTimeController::class, 'edit'])->name('resettimes.edit');
    Route::post('/admin/resettimes/{resettimes}', [ResetTimeController::class, 'update'])->name('resettimes.update');
    Route::delete('/admin/resettimes/{resettimes}', [ResetTimeController::class, 'delete'])->name('resettimes.delete');

    Route::get('/admin/banners', [BannerController::class, 'admin']);
    Route::get('/admin/banners/add', [BannerController::class, 'create']);
    Route::post('/admin/banners/add', [BannerController::class, 'store'])->name('banners.store');
    Route::get('/admin/banners/{banner}/edit', [BannerController::class, 'edit'])->name('banners.edit');
    Route::post('/admin/banners/{banner}', [BannerController::class, 'update'])->name('banners.update');
    Route::delete('/admin/banners/{banner}', [BannerController::class, 'delete'])->name('banners.delete');

    Route::get('/admin/import', [FileImportController::class, 'admin']);
    Route::post('/admin/import', [FileImportController::class, 'import'])->name('admin.import');

});


Route::get('/adminlogin', [AdminAuthController::class, 'create']);
Route::post('/adminlogin', [AdminAuthController::class, 'store'])->name('admin.login');
Route::post('/admin/logout', [AdminAuthController::class, 'destroy'])->name('admin.logout');





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

/* for RL only */
use App\Http\Controllers\SearchController;

Route::get('/search', [SearchController::class, 'index'])->name('search');
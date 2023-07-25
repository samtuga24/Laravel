<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashController;
use App\Http\Controllers\FollowsController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Models\Profile;
use App\Repositories\ChatRepository;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('dashboard/{user}',[DashController::class,'show']);

// Route::get('/profile/1', function () {
//     return Inertia::render('UserPage');
// })->middleware(['auth', 'verified'])->name('profile');

// Route::get('/messages/{user}', function () {
//     return Inertia::render('MessageView');
// })->middleware(['auth', 'verified'])->name('message');

Route::get('/messages/{user}', [MessageController::class, 'index']);
Route::get('/follow-status/{user}', [ProfileController::class, 'status']);
Route::get('/load/{user}/{id}', [ChatRepository::class, 'show']);
Route::get('/nav/{id}', [ProfileController::class, 'index']);
Route::post('/messages/post/{id}', [MessageController::class, 'store']);
Route::post('/post', [PostController::class, 'store']);
Route::get('/following', [PostController::class, 'show']);
Route::get('/search/{name}', [ProfileController::class, 'search']);
Route::get('/followers/{user}', [ProfileController::class, 'followers']);
Route::get('/comment/{id}', [CommentController::class, 'show']);
Route::post('/comment/{id}', [CommentController::class, 'store']);
Route::post('/like/{post}', [LikeController::class, 'store']);
Route::middleware('auth')->group(function () {
    Route::get('/profile/{user}', [ProfileController::class, 'show'])->name('profile.show');
    Route::post('/follow/{user}', [FollowsController::class, 'store']);
    Route::patch('/p/{user}', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'profileupdate'])->name('profileupdate.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

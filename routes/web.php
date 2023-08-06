<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashController;
use App\Http\Controllers\FollowsController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Models\Profile;
use App\Repositories\ChatRepository;
use App\Repositories\NotificationRepository;
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

Route::get('/auth/{provider}/redirect', [App\Http\Controllers\Auth\ProviderController::class, 'redirect']);
 
Route::get('/auth/{provider}/callback', [App\Http\Controllers\Auth\ProviderController::class, 'callback']);

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

Route::get('/messages/{user}', [MessageController::class, 'index'])->middleware('auth');
Route::patch('/read/message/{receiverId}', [MessageController::class, 'update_read'])->middleware('auth');
Route::get('/all-users', [ProfileController::class, 'show_users'])->middleware('auth');
Route::get('/recent', [MessageController::class, 'show'])->middleware('auth');
Route::get('/follow-status/{user}', [ProfileController::class, 'status']);
Route::get('/load/{user}/{id}', [ChatRepository::class, 'show'])->middleware('auth');
// Route::get('/notify/{user}/{id}', [NotificationRepository::class, 'show']);
Route::get('/notify/load/{user}', [NotificationController::class, 'show']);
Route::post('/notify/post/{id}/{content}', [NotificationController::class, 'store']);
Route::get('/message/unread', [MessageController::class, 'unread']);
Route::get('/unread/notification', [NotificationController::class, 'index']);
Route::patch('/unread', [NotificationController::class, 'update']);
Route::patch('/unread/message', [MessageController::class, 'update']);
Route::get('/nav', [ProfileController::class, 'index']);
Route::post('/messages/post/{id}', [MessageController::class, 'store'])->middleware('auth');
Route::get('/notification', [DashController::class, 'index']);
Route::post('/post', [PostController::class, 'store']);
Route::get('/following', [PostController::class, 'show']);
Route::get('/search/{name}', [ProfileController::class, 'search']);
Route::get('/followers/{user}', [ProfileController::class, 'followers']);
Route::get('/comment/show/{id}', [CommentController::class, 'show']);
Route::post('/comment/{id}', [CommentController::class, 'store']);
Route::post('/comment/{id}/{post_id}', [CommentController::class, 'store_comment']);
Route::post('/like/{post}', [LikeController::class, 'store']);
Route::post('/comment/like/{comment}', [LikeController::class, 'store_comment_like']);
Route::middleware('auth')->group(function () {
    Route::get('/profile/{user}', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/edit/{user}', [ProfileController::class, 'showfollowing']);
    Route::post('/follow/{user}', [FollowsController::class, 'store']);
    Route::patch('/p/{user}', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'profileupdate'])->name('profileupdate.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

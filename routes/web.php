<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
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

    Route::get('/dashboard', [UsersController::class, 'index'])->middleware('verified')->name('dashboard');
    Route::post('/users-create', [UsersController::class, 'create'])->middleware('verified')->name('users-create');
    Route::post('/users/edit/{id}', [UsersController::class, 'edit'])->middleware('verified')->name('users-edit');
    Route::delete('/users/{id}', [UsersController::class, 'delete'])->middleware('verified')->name('user-delete');
});

require __DIR__ . '/auth.php';

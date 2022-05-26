<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthContoller;

Route::post('register', [AuthContoller::class, 'register']);
Route::post('login', [AuthContoller::class, 'login']);
Route::get('/users', [AuthContoller::class, 'userslist']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message'=>'You are in', 'status' => 200], 200);
    });
    Route::post('logout', [AuthContoller::class, 'logout']);
});

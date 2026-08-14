<?php

use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;

Route::get('/products', [ApiController::class, 'products']);
Route::get('/products/{slug}', [ApiController::class, 'product']);
Route::post('/orders', [ApiController::class, 'storeOrder']);

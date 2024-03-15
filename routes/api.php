<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/user/register', [ApiController::class, 'userRegister']);
Route::post('/user/login', [ApiController::class, 'userLogin']);
Route::get('getUserDetails',[ApiController::class,'getUserBYtokenOrUserID']);
Route::post('/update/{id}', [ApiController::class, 'updateBook']);


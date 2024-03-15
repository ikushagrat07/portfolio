<?php

use App\Http\Controllers\DomPdfController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Welcomer;
use App\Http\Controllers\PortFolioController;
use Illuminate\Contracts\Queue\ShouldBeUniqueUntilProcessing;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/home',[PortFolioController::class,'home'])->name('home');

Route::post('/add-data',[PortFolioController::class,'addData'])->name('addData');


// ----------------------------------PDF---------------------------------------------

Route::get('/get-pdf',[DomPdfController::class,'getPdf']);
Route::get('/index',[DomPdfController::class,'index']);
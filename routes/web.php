<?php

use Illuminate\Support\Facades\Route;


// Route::get('/pokemon', function () {
//     return view('index');
// });

// Route::get('/', function () {
//     return view('welcome');
// });


 Route::get('/{any}', function() {
         return view('app');
 })->where('any', '.*');
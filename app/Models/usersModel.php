<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class usersModel extends Model
{
    public static function checkLogin($email,$password){
        return DB::table('users')->where('email',$email)->where('password',$password)->get()->first();
     }

     public static function checkRegister($insert){

        return DB::table('users')->insert($insert);
     }
}

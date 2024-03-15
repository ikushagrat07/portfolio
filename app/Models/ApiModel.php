<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ApiModel extends Model
{
    protected $table = 'users'; // Assuming the users table in the database
    public static function getUserByEmail($email)
    {
       
        return DB::table('users')->select('*')->where('email', $email)->first();
    }

    public static function doRegister($userData)
    {
      $insert=DB::table('users')->insert($userData);
     return $insert;
    } 
     
    public static function getUserByID($id)
    {
        return DB::table("users")
            ->select(
                "users.user_id",
                "users.first_name",
                "users.last_name",
                "users.username",
                "users.email",
                "users.gender",
                "users_authentication.user_token",
                "users_authentication.firebase_token",
            )
            
            ->join(
                "users_authentication",
                "users.user_id",
                "=",
                "users_authentication.user_id"
            )
            ->where("users.user_id", $id)
            ->get()
            ->first();
    }

    public static function getUserByToken($token)
    {
        return DB::table("users")
            ->select(
                "users.user_id",
                "users.first_name",
                "users.last_name",
                "users.username",
                "users.email",
                "users.gender",
                "users_authentication.user_token",
                "users_authentication.firebase_token",
            )
            
            ->join(
                "users_authentication",
                "users.user_id",
                "=",
                "users_authentication.user_id"
            )
            ->where("users_authentication.user_token", $token)
            ->get()
            ->first();
    }

  public static function updateBook($update , $id)
  {
    $data=DB::table('books')->where('id',$id)->update($update);
    return $data;
  }

}


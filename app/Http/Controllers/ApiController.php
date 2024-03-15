<?php

namespace App\Http\Controllers;

use App\Models\ApiModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
    public function userRegister(Request $request)
    {
        // Validate the request data using Laravel's Validator
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'username' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'gender' => 'required',
            'password' => 'required|min:8',
            'confirm_password' => 'required|same:password',
            'device_id' => 'required',
        ], [
            'required' => 'This :attribute is required',
            'unique' => 'The :attribute has already been taken',
        ]);
  
        // If validation fails, return an error response
        if ($validator->fails()) {
            return response()->json(['result' => 0, 'errors' => $validator->errors()], 400);
        }

        $insert = array(
            'first_name' => $request->post('first_name'),
            'last_name' => $request->post('last_name'),
            'username' => $request->post('username'),
            'email' => $request->post('email'),
            'gender' => $request->post('gender'),
            'password' => $request->post('password'),

        );
        $result = ApiModel::doRegister($insert);

        if ($result) {
            return response()->json(['result' => 1, 'msg' => 'Registration Successful!', 'data' => [$result]]);
        } else {
            return response()->json(['result' => -1, 'msg' => 'Registration Failed!']);
        }
    }
public function userLogin(Request $request)
{
    $validator = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    
    $email = $request->input('email');
    $password = $request->input('password');

    $user = ApiModel::getUserByEmail($email, $password);

    if ($user) {
        
        return response()->json(['result' => 1, 'msg' => 'Login Successful!', 'data' => $user]);;
    } else {
       
        return response()->json(['result' => 2,'Authentication failed']);
    }
}

public function getUserBYtokenOrUserID(Request $request)
{
    $token = $request->header('token');
    $user_id = $request->post('user_id');

    if (empty($user_id)) {
        if (empty($token)) {
            return response()->json(['result' => -1, "msg" => "Please Provide User Token or User id"]);
        }
    } elseif (empty($token)) {
        if (empty($user_id)) {
            return response()->json(['result' => -1, "msg" => "Please Provide User Token or User id"]);
        }
    }
    if (!empty($token)) {
        $result = ApiModel::getUserByToken($token);
    }
    if (!empty($user_id)) {
        $result = ApiModel::getUserByID($user_id);
    }
    if ($result) {

        return response()->json(['result' => 1, "msg" => "Data Fetched Successfully !!", 'data' => $result]);
    } else {
        return response()->json(['result' => -1, "msg" => "Something went Wrong", 'data' => null]);
    }
}
   
    public function updateBook(request$request, $id)
    {
      $data= array(  
            'name' => $request->post('name'),
            'author' => $request->post('author'),
            'type' => $request->post('type'),
            'description' => $request->post('description'),
      );
      $result = ApiModel::updateBook($data,$id);   

      if ($result) {
        return response()->json(['result' => 1, 'msg' => 'Deleted Successful!', 'data' => [$result]]);
    } else {
        return response()->json(['result' => -1, 'msg' => 'Something went wrong']);
    }
    }
}

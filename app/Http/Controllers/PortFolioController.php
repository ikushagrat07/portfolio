<?php

namespace App\Http\Controllers;

use App\Models\PortFolioModel;
use Illuminate\Http\Request;

class PortFolioController extends Controller
{

    public function home()
    {
        return view('home');
    }

    public function addData(Request $request)
    {
        // dd('hello world');
        $insert = [

            'name' => $request->post('name'),
            'email' => $request->post('email'),
            'message' => $request->post('message'),
        ];

        //    dd($insert);

        $result = PortFolioModel::insert($insert);
        if ($result) {
            return redirect('/home');

        } else {
           echo('Something Went Wrong');

        }

    }
}

<?php

namespace App\Http\Controllers;

use PDF;
use Illuminate\Http\Request;

class DomPdfController extends Controller
{
    public function getPdf(Request $request)
    {
        $data = [
             'title' => 'MY RESUME',
             'date'=> date('m/d/y')
        ];

        $pdf= PDF::loadView('myPDF', $data);

        return $pdf->download('Resume.pdf');
    }

    public function index()
    {
        return view('pdf');
    } 
}

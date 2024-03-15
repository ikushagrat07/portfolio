<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class PortFolioModel extends Model
{
    use HasFactory;

    public static function insert($insert)
    {
       return DB::table('port_folio')
       ->insert($insert);
    }
}

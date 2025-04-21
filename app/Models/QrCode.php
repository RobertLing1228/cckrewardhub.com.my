<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QrCode extends Model
{
    protected $table = 'qr_codes';

    protected $primaryKey = 'id';

    public $timestamps = false;

    public $fillable = [
        'qr_type',
        'product_id',
        'qr_value',
    ];


}

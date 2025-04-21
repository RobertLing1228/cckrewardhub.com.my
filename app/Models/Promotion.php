<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{

    protected $table = 'promotions';
    protected $primaryKey = 'promotionID';

    public $timestamps = false;

    protected $fillable = [
        'productID',
        'title',
        'description',
        'start_date',
        'end_date',
        'code',
    ];
}

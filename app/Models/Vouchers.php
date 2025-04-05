<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vouchers extends Model
{
    protected $table = 'vouchers';
    protected $primaryKey = 'id';
    protected $fillable = ['code', 'name', 'date_issued', 'end_date', 'status', 'discount_type', 'discount_value'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserVouchers extends Model
{
    protected $table = 'user_vouchers';

    protected $primaryKey = 'id';

    public $timestamps = false;


    protected $fillable = ['userID',	'voucher_ID',	'status',	'claimed_at',	'used_at'];

}

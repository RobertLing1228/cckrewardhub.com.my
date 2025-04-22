<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Vouchers;

class WheelReward extends Model
{
    protected $fillable = ['reward_type', 'voucher_id'];

    public function voucher()
    {
        return $this->belongsTo(Vouchers::class, 'voucher_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WheelReward extends Model
{
    protected $table = 'wheel_rewards';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'reward_type',
        'voucher_value',
    ];

    
}

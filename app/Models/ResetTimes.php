<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResetTimes extends Model
{
    protected $table = 'reset_times';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'game_type',   // enum: 'mission' or 'wheel'
        'reset_time',   // TIME format
        'isWeekly'     // boolean
    ];
}

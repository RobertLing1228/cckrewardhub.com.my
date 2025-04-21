<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserMissions extends Model
{
    protected $table = 'user_missions';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'mission_id',
        'progress',
        'reward_claimed',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    protected $fillable = ['mission_name', 'mission_description', 'mission_goal'];

    public function userMissions()
    {
        return $this->hasMany(UserMission::class, 'mission_id');
    }
}

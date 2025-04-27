<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{

    protected $table = 'missions';

    protected $primaryKey = 'id';
    protected $fillable = ['mission_name', 'mission_description', 'mission_goal'];

    public $timestamps = false;

    public function userMissions()
    {
        return $this->hasMany(UserMission::class, 'mission_id');
    }
}

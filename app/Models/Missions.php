<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Missions extends Model
{
    protected $table = 'missions'; // optional if it matches the class name

    protected $primaryKey = 'id'; // optional, defaults to 'id'

    public $timestamps = false; // assuming you’re not using created_at/updated_at

    protected $fillable = [
        'mission_name',
        'mission_description',
        'mission_goal',
    ];
}

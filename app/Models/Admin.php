<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = "admin";

    protected $primaryKey = 'adminID';

    public $timestamps = false;

    protected $fillable = [
        'name',
        'pass',
    ];

}

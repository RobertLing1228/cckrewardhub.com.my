<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use Notifiable;

    protected $guard = 'admin';

    protected $primaryKey = 'adminID'; // Set the primary key

    protected $table = 'admins';



    protected $fillable = [
        'name',
        'password',
    ];

    protected $hidden = [
        'password',
    ];
}

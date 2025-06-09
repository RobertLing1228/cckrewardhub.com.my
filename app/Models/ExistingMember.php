<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExistingMember extends Model
{

    protected $table = 'exist_member';
    protected $primaryKey = 'existsmemID';
    public $timestamps = false;

    protected $fillable = [
        'memberID',
        'phoneNumber',
    ];
}

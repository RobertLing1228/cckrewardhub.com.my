<?php

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{

    protected $table = 'user';
    protected $primaryKey = 'userID';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'memberID',
        'phoneNumber',
    ];
    protected $casts = [
        'memberID' => 'string',
        'phoneNumber' => 'string',
    ];

    public function getMemberIDAttribute($value)
    {
        return $this->attributes['memberID'];
    }

    public function getPhoneNumberAttribute($value)
    {
        return $this->attributes['phoneNumber'];
    }
}

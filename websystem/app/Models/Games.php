<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Games extends Model
{
    protected $table = 'games';

    protected $primaryKey = 'gameID';

    public $timestamps = false;

    protected $fillable = [
        'title',
        'description',
        'image',
        'gameLink',
    ];
}

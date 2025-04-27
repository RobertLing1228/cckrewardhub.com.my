<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $table = 'banners';

    protected $primaryKey = 'id';
    
    public $timestamps = true;

    protected $fillable = [
        'image_path',
        'link',
    ];
}
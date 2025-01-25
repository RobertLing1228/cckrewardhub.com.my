<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{

    protected $table = 'recipes';
    protected $primaryKey = 'recipeID';
    public $timestamps = false;  // Disable timestamps if not required

    protected $fillable = [
        'productID',
        'category',
        'title',
        'description',
        'image',
    ];
}

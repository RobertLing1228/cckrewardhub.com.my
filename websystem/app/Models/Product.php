<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    // Define the table name (optional if it matches the plural form of the model name)
    protected $table = 'product';

    // Specify the fillable fields
    protected $fillable = [
        'name',
        'price',
        'description',
        'category',
        'image',
    ];

    // If you want to disable timestamps (created_at, updated_at):
    public $timestamps = false;
}

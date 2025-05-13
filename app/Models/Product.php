<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $table = 'products';
    protected $primaryKey = 'productID';
    // Disable timestamps if the table doesn't have created_at and updated_at
    public $timestamps = false;

    // Define the fillable attributes for mass assignment
    protected $fillable = [
        'name',
        'price',
        'description',
        'category',
        'image',
        'is_hot',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];
}

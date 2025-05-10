<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    // Define the table name if it's not the plural form of the model
    protected $table = 'products';

    // Specify the primary key if it's not `id`
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
        'itemHot'
    ];

    // Optionally, define casts for specific fields
    protected $casts = [
        'price' => 'decimal:2',
    ];
}

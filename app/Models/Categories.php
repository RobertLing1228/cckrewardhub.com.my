<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    protected $table = 'categories';

    // Specify the primary key if it's not `id`
    protected $primaryKey = 'categoryID';

    // Disable timestamps if the table doesn't have created_at and updated_at
    public $timestamps = false;

    protected $fillable = [
        'categoryName',
    ];
}

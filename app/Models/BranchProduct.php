<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BranchProduct extends Model
{
    protected $table = 'branch_product';

    protected $primaryKey = 'id';

    public $timestamps = true;

    protected $fillable = [
        'branch_id',
        'productID',
        'stock'
    ];
}

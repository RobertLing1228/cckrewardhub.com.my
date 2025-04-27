<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = ['name'];
    protected $table = 'branches';

    protected $primaryKey = 'id';
    public $timestamps = true;

    public function products()
    {
        return $this->belongsToMany(Product::class, 'branch_product')
                    ->withPivot('stock')
                    ->withTimestamps();
    }
}

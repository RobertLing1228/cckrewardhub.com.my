<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QRCode extends Model
{
    protected $table = 'qr_codes';

    protected $fillable = [
        'product_id',
        'qr_value',
        'qr_type',
    ];

    public $timestamps = false; // If your table doesn't have created_at/updated_at

    // Relationships
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
    protected $table = 'claim';

    protected $primaryKey = 'claimID';

    public $timestamps = false;

    protected $fillable = ['voucherID', 'memberID', 'gameType', 'claim_date', 'status'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoginLog extends Model
{
    protected $table = 'login_logs';
    protected $primaryKey = 'id';
    public $timestamps = false;

    public $fillable = [
        'user_id',
        'logged_in_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'userID');
    }
}

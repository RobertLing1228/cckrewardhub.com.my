<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MissionCompletionLog extends Model
{
    protected $table = 'mission_completion_logs';
    protected $primaryKey = 'id';
    public $timestamps = true;

    public $fillable = [
        'user_id',
        'date_completed',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'userID');
    }
}

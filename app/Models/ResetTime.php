<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResetTime extends Model
{
    // Set custom table name (optional if Laravel guesses it correctly)
    protected $table = 'reset_times';

    // Disable timestamps since the table doesn't have them
    public $timestamps = false;

    // Allow mass assignment on these fields
    protected $fillable = [
        'game_type',
        'start_date',
        'end_date',
        'reset_day',
    ];

    // Optional: constants for game types
    public const TYPE_MISSION = 'mission';
    public const TYPE_WHEEL = 'wheel';

    // Optional: helper scope to get a specific game type reset time
    public function scopeForGame($query, $type)
    {
        return $query->where('game_type', $type);
    }
}

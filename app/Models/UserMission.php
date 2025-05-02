<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserMission extends Model
{
    public $timestamps = false;
    use HasFactory;

    protected $fillable = [
        'user_id',
        'mission_id',
        'progress',
        'reward_claimed',
        'created_at',
        'completed_at',
    ];

    public static function ensureUserMissionsExist($userId)
    {
        if (!self::where('user_id', $userId)->exists()) {
            $missions = \App\Models\Mission::all();

            foreach ($missions as $mission) {
                self::create([
                    'user_id' => $userId,
                    'mission_id' => $mission->id,
                    'progress' => 0,
                    'reward_claimed' => false,
                    'created_at' => now(),
                    'completed_at' => null,
                ]);
            }
        }
    }

    public function mission()
    {
        return $this->belongsTo(Mission::class);
    }

}

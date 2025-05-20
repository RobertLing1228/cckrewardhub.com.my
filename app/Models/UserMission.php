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
        'completed_at',
        'created_at',
        'type',
    ];

    public function mission()
    {
        return $this->belongsTo(Mission::class, 'mission_id');
    }


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
                    'completed_at' => null,
                    'created_at' => now(),
                ]);
            }
        }
    }
}

<?php
namespace App\Services;

use App\Models\WheelReward;
use Illuminate\Support\Facades\DB; 

class WheelProbabilityService
{
    public static function adjustProbabilities($changedReward = null, $newProbability = null)
    {
        $rewards = WheelReward::all();
        $totalProbability = $rewards->sum('probability');
        
        // If adding a new reward
        if (!$changedReward) {
            $remainingProbability = 1 - $newProbability;
            $rewards->each->update(['probability' => DB::raw("probability * $remainingProbability")]);
            return;
        }

        // If editing existing reward
        $probabilityDifference = $newProbability - $changedReward->probability;
        $otherRewards = $rewards->where('id', '!=', $changedReward->id);
        
        if ($otherRewards->isEmpty()) return; // Only one reward
        
        // Adjust other rewards proportionally
        $totalOtherProbability = $otherRewards->sum('probability');
        $scaleFactor = ($totalOtherProbability - $probabilityDifference) / $totalOtherProbability;
        
        foreach ($otherRewards as $reward) {
            $reward->update(['probability' => $reward->probability * $scaleFactor]);
        }
    }

    public static function redistributeAfterDeletion($deletedProbability)
    {
        $rewards = WheelReward::all();
        if ($rewards->isEmpty()) return;

        $totalProbability = $rewards->sum('probability');
        $scaleFactor = (1 - $deletedProbability) / $totalProbability;

        foreach ($rewards as $reward) {
            $reward->update(['probability' => $reward->probability * $scaleFactor]);
        }
    }
}
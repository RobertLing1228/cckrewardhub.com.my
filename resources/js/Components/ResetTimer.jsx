import React, { useEffect, useState } from "react";

export default function ResetTimer({ label, time, isWeekly = false }) {
    const [countdown, setCountdown] = useState("");
    const [nextResetDate, setNextResetDate] = useState(null);

    useEffect(() => {
        const calculateResetTime = () => {
            if (!time) return null;

            const [hours, minutes, seconds] = time.split(":").map(Number);
            const now = new Date();
            const target = new Date(now);

            if (isWeekly) {
                const currentDay = now.getDay(); // 0 = Sun, 1 = Mon
                const daysUntilNextMonday = (8 - currentDay) % 7 || 7;
                target.setDate(now.getDate() + daysUntilNextMonday);
                target.setHours(hours, minutes, seconds, 0);

                if (currentDay === 1) {
                    const todayReset = new Date(now);
                    todayReset.setHours(hours, minutes, seconds, 0);
                    if (now < todayReset) return todayReset;
                }

                return target;
            } else {
                target.setHours(hours, minutes, seconds, 0);
                if (target <= now) target.setDate(target.getDate() + 1);
                return target;
            }
        };

        const updateCountdown = () => {
            const targetTime = calculateResetTime();
            if (!targetTime) return;

            setNextResetDate(targetTime);

            const now = new Date();
            const diff = targetTime - now;

            if (diff <= 0) {
                setCountdown("Resetting soon...");
                return;
            }

            const totalSeconds = Math.floor(diff / 1000);
            const days = Math.floor(totalSeconds / (3600 * 24));
            const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [time, isWeekly]);

    const formatDateTime = (date) => {
        if (!date) return "N/A";
        return date.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });
    };

    return (
        <div className="bg-yellow-100 text-yellow-900 p-4 rounded-lg shadow">
            <strong>{label} Reset Timer</strong><br />
            <strong>Countdown:</strong> {countdown}<br />
            <strong>Next Reset:</strong> {formatDateTime(nextResetDate)}
        </div>
    );
}

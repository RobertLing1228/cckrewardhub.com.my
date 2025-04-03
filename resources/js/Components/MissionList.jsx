import React, { useState } from "react";

export default function MissionList({ missions }) {
    return (
        <div className="mb-6" >
            <h2 className="text-2xl font-bold mb-4">Missions</h2>
            <ul className="list-none pl-6">
                {missions.map((mission, index) => (
                    <li key={index} className="mb-2 ">
                        <span className="font-bold">{index + 1}. </span>
                        <span>{mission}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
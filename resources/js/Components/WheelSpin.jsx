import React, { useEffect } from 'react';

export default function WheelSpinWidget() {
    useEffect(() => {
        // Load the Elfsight platform script dynamically
        const script = document.createElement('script');
        script.src = 'https://static.elfsight.com/platform/platform.js';
        script.async = true;
        document.body.appendChild(script);

        // Cleanup the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            {/* Elfsight Widget */}
            <div className="elfsight-app-85d79734-93a3-4e17-b5fa-bd9c6d24be24" data-elfsight-app-lazy></div>
        </div>
    );
}
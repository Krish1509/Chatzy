import React, { useState, useEffect } from 'react';

const AnimatedIcon = () => {
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFlip(true); // Start flip animation after 5 seconds
        }, 5000); // 5 seconds delay

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    return (
        <div className="icon-container">
            <div
                className={`relative flex items-center cursor-pointer justify-center w-10 h-10 bg-cyan-500 text-white shadow-md ${flip ? 'flip' : ''}`}
            >
                <div className="icon">
                    <span className="text-xl">🤖</span>
                </div>
                <div className="ai-label">
                    AI
                </div>
            </div>
        </div>
    );
};

export default AnimatedIcon;

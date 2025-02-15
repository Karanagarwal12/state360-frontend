import React from 'react';

const ScrollingBanner = () => {
    return (
        <div className="relative w-full overflow-hidden mx-auto">
            <div className="flex animate-slide mx-auto">
                <img
                    src="/image/timeline.png"
                    alt="Hackathon Image 1"
                    className="w-full h-auto object-contain p-2 flex-shrink-0"
                />
                <img
                    src="/image/yogiji.avif"
                    alt="Hackathon Image 2"
                    className="w-full h-auto object-cover flex-shrink-0"
                />
                <img
                    src="/image/timeline.png"
                    alt="Hackathon Image 4"
                    className="w-full h-auto object-cover flex-shrink-0"
                />
                <img
                    src="/image/yogiji.avif"
                    alt="Hackathon Image 3"
                    className="w-full h-auto object-cover flex-shrink-0"
                />

            </div>
        </div>
    );
};

export default ScrollingBanner;

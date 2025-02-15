// components/Card.tsx
import React from 'react';

interface CardProps {
    title: string;
    description: string;
    image?: string;
    link?: string;
}

const Card: React.FC<CardProps> = ({ title, description, image, link }) => {
    return (
        <div className="max-w-xl mx-auto mt-8 flex p-2 border justify-center items-center rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
            <img className="w-24 h-24 object-cover" src={image} alt={title} />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-700 mt-2">{description}</p>
                {link && <a
                    href={link}
                    className="inline-block mt-4 text-blue-500 hover:underline"
                >
                    Learn More
                </a>}
            </div>
        </div>
    );
};

export default Card;

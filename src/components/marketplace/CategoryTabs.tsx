import React, { useState } from 'react';
import './CategoryTabs.css';

const CATEGORIES = [
    "All",
    "Handwritten Notes",
    "Previous Year Papers",
    "Question Banks",
    "Video References",
    "Lab Manuals"
];

export const CategoryTabs: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    return (
        <div className="category-tabs">
            {CATEGORIES.map((category) => (
                <button
                    key={category}
                    className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

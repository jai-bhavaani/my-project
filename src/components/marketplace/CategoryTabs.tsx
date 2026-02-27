import React from 'react';
import './CategoryTabs.css';

const CATEGORIES = [
    "All",
    "Handwritten Notes",
    "Previous Year Papers",
    "Question Banks",
    "Video References",
    "Lab Manuals"
];

interface CategoryTabsProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onCategoryChange }) => {
    return (
        <div className="category-tabs">
            {CATEGORIES.map((category) => (
                <button
                    key={category}
                    className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

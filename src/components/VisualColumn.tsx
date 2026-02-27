import React from 'react';
import './VisualColumn.css';

export const VisualColumn: React.FC = () => {
    return (
        <div className="visual-column">
            {/* Background decorative elements */}
            <div className="visual-column__blob visual-column__blob--1"></div>
            <div className="visual-column__blob visual-column__blob--2"></div>

            {/* Main glassmorphism container */}
            <div className="visual-column__glass glass-panel">
                <div className="visual-column__content">
                    <div className="visual-column__graphic">
                        {/* Abstract Geometric Shapes */}
                        <div className="shape shape--circle"></div>
                        <div className="shape shape--square"></div>
                        <div className="shape shape--triangle"></div>
                    </div>
                    <div className="visual-column__text">
                        <h2>Accelerate Your Academic Potential</h2>
                        <p>Join thousands of students organizing their study journey with our unified resource hub.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

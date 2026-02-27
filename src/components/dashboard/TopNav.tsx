import React from 'react';
import './TopNav.css';
import { Search, Bell, Menu } from 'lucide-react';

interface TopNavProps {
    onMenuClick: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onMenuClick }) => {
    return (
        <header className="top-nav">
            <div className="top-nav__left">
                <button className="top-nav__menu-btn" onClick={onMenuClick}>
                    <Menu size={24} />
                </button>
                <div className="top-nav__search">
                    <Search className="top-nav__search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search for Computer Networks notes, PYQs, or reference links..."
                        className="top-nav__search-input"
                    />
                </div>
            </div>

            <div className="top-nav__right">
                <button className="top-nav__notification-btn">
                    <Bell size={20} />
                    <span className="top-nav__notification-badge"></span>
                </button>

                <div className="top-nav__profile">
                    <div className="top-nav__profile-info">
                        <span className="top-nav__profile-name">Tanvi</span>
                        <span className="top-nav__profile-role">Student</span>
                    </div>
                    <div className="top-nav__avatar">
                        {/* Placeholder for avatar image */}
                        <span>T</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

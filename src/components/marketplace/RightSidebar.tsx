import React from 'react';
import './RightSidebar.css';
import { Award, Upload, TrendingUp, ChevronRight } from 'lucide-react';

export const RightSidebar: React.FC = () => {
    return (
        <aside className="right-sidebar">
            {/* Quick Stats Panel */}
            <div className="sidebar-panel">
                <h3 className="sidebar-panel__title">Your Impact</h3>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-card__icon stat-card__icon--primary">
                            <Award size={20} />
                        </div>
                        <div className="stat-card__info">
                            <p className="stat-card__value">1,250</p>
                            <p className="stat-card__label">Total Points</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card__icon stat-card__icon--secondary">
                            <Upload size={20} />
                        </div>
                        <div className="stat-card__info">
                            <p className="stat-card__value">14</p>
                            <p className="stat-card__label">Files Uploaded</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Leaderboard/Trending Panel */}
            <div className="sidebar-panel">
                <div className="sidebar-panel__header">
                    <h3 className="sidebar-panel__title">Weekly Trending</h3>
                    <TrendingUp size={18} className="sidebar-panel__header-icon" />
                </div>

                <ul className="trending-list">
                    <li className="trending-item">
                        <div className="trending-item__rank">1</div>
                        <div className="trending-item__content">
                            <p className="trending-item__title">Advanced Algorithms PYQ 2024</p>
                            <p className="trending-item__meta">452 downloads</p>
                        </div>
                        <ChevronRight size={16} className="trending-item__arrow" />
                    </li>

                    <li className="trending-item">
                        <div className="trending-item__rank">2</div>
                        <div className="trending-item__content">
                            <p className="trending-item__title">Database Systems Hand... Notes</p>
                            <p className="trending-item__meta">389 downloads</p>
                        </div>
                        <ChevronRight size={16} className="trending-item__arrow" />
                    </li>

                    <li className="trending-item">
                        <div className="trending-item__rank">3</div>
                        <div className="trending-item__content">
                            <p className="trending-item__title">React Architecture Video By Sir</p>
                            <p className="trending-item__meta">310 views</p>
                        </div>
                        <ChevronRight size={16} className="trending-item__arrow" />
                    </li>
                </ul>

                <button className="sidebar-panel__action">View Full Leaderboard</button>
            </div>
        </aside>
    );
};

import React from 'react';
import './AdminDashboard.css';
import { AdminTable } from './AdminTable';
import { Clock, CheckCircle, XCircle, AlertTriangle, Info, LogOut } from 'lucide-react';

interface AdminDashboardProps {
    onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    return (
        <div className="admin-dashboard-container">
            {/* Admin Top Nav */}
            <header className="admin-topnav">
                <div className="admin-topnav__brand">
                    StudyHub <span className="admin-topnav__badge">Admin Portal</span>
                </div>
                <button className="admin-topnav__logout" onClick={onLogout}>
                    <LogOut size={16} /> Logout
                </button>
            </header>

            <div className="admin-dashboard">
                <div className="admin-dashboard__header">
                    <h1 className="admin-dashboard__title">Moderation Queue</h1>
                    <p className="admin-dashboard__subtitle">Review and moderate student-submitted resources before they go live.</p>
                </div>

                <div className="admin-dashboard__layout">
                    <div className="admin-dashboard__main">

                        {/* KPI Cards */}
                        <div className="admin-kpi-cards">
                            <div className="admin-kpi-card admin-kpi-card--pending">
                                <div className="admin-kpi-card__header">
                                    <h3 className="admin-kpi-card__title">Pending Approvals</h3>
                                    <div className="admin-kpi-card__icon-wrap"><Clock size={20} /></div>
                                </div>
                                <div className="admin-kpi-card__value">12</div>
                                <p className="admin-kpi-card__trend">In queue right now</p>
                            </div>

                            <div className="admin-kpi-card admin-kpi-card--approved">
                                <div className="admin-kpi-card__header">
                                    <h3 className="admin-kpi-card__title">Approved Today</h3>
                                    <div className="admin-kpi-card__icon-wrap"><CheckCircle size={20} /></div>
                                </div>
                                <div className="admin-kpi-card__value">48</div>
                                <p className="admin-kpi-card__trend positive">↑ 12% from yesterday</p>
                            </div>

                            <div className="admin-kpi-card admin-kpi-card--rejected">
                                <div className="admin-kpi-card__header">
                                    <h3 className="admin-kpi-card__title">Rejected Today</h3>
                                    <div className="admin-kpi-card__icon-wrap"><XCircle size={20} /></div>
                                </div>
                                <div className="admin-kpi-card__value">5</div>
                                <p className="admin-kpi-card__trend negative">Spam/Invalid links</p>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="admin-controls">
                            <div className="admin-controls__search">
                                <input
                                    type="text"
                                    placeholder="Search by student or subject..."
                                    className="admin-input-search"
                                />
                            </div>
                            <div className="admin-controls__filter">
                                <select className="admin-select-filter">
                                    <option value="all">All Subjects</option>
                                    <option value="os">Operating Systems</option>
                                    <option value="cn">Computer Networks</option>
                                    <option value="ds">Data Structures</option>
                                </select>
                            </div>
                        </div>

                        <div className="admin-table-container">
                            <AdminTable />
                        </div>

                    </div>

                    <aside className="admin-sidebar">
                        <div className="admin-sidebar-panel">
                            <div className="admin-sidebar-panel__header">
                                <h3 className="admin-sidebar-panel__title">Moderator Guidelines</h3>
                                <Info size={18} className="admin-sidebar-panel__header-icon" />
                            </div>
                            <ul className="admin-guideline-list">
                                <li className="admin-guideline-item"><strong>Relevance:</strong> Ensure the material matches the tagged Subject and Semester clearly.</li>
                                <li className="admin-guideline-item"><strong>Quality:</strong> Notes should be legible. Links must not be broken or require access requests.</li>
                                <li className="admin-guideline-item"><strong>Originality:</strong> Avoid approving obvious duplicates of existing marketplace resources.</li>
                            </ul>
                        </div>

                        <div className="admin-sidebar-panel admin-sidebar-panel--warning">
                            <div className="admin-sidebar-panel__header">
                                <h3 className="admin-sidebar-panel__title" style={{ color: '#B45309' }}>Rejection Protocol</h3>
                                <AlertTriangle size={18} color="#B45309" />
                            </div>
                            <p className="admin-guideline-intro" style={{ color: '#92400E' }}>Reject immediately if the link contains:</p>
                            <ul className="admin-guideline-list" style={{ color: '#92400E' }}>
                                <li className="admin-guideline-item">Promotional or spam content.</li>
                                <li className="admin-guideline-item">Malicious software or suspicious redirects.</li>
                                <li className="admin-guideline-item">Inappropriate or non-academic material.</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

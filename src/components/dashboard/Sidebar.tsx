import React from 'react';
import './Sidebar.css';
import {
    BookOpen,
    LayoutDashboard,
    UploadCloud,
    ShieldAlert,
    Book,
    LogOut
} from 'lucide-react';

interface SidebarProps {
    onLogout: () => void;
    onNavigate: (view: 'marketplace' | 'upload' | 'admin') => void;
    currentView: 'marketplace' | 'upload' | 'admin';
    onSemesterSelect?: (semester: number | null) => void;
    activeSemester?: number | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, onNavigate, currentView, onSemesterSelect, activeSemester }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar__header">
                <BookOpen className="sidebar__logo-icon" size={28} />
                <span className="sidebar__logo-text">StudyHub</span>
            </div>

            <nav className="sidebar__nav">
                <div className="sidebar__section">
                    <p className="sidebar__section-title">MAIN</p>
                    <ul className="sidebar__menu">
                        <li>
                            <button
                                onClick={() => {
                                    onNavigate('marketplace');
                                    if (onSemesterSelect) onSemesterSelect(null); // Clear semester filter on main dashboard click
                                }}
                                className={`sidebar__link ${currentView === 'marketplace' && !activeSemester ? 'active' : ''}`}
                                style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left' }}
                            >
                                <LayoutDashboard size={20} />
                                <span>Dashboard</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => onNavigate('upload')}
                                className={`sidebar__link ${currentView === 'upload' ? 'active' : ''}`}
                                style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left' }}
                            >
                                <UploadCloud size={20} />
                                <span>Contribute</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => onNavigate('admin')}
                                className={`sidebar__link ${currentView === 'admin' ? 'active' : ''}`}
                                style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left' }}
                            >
                                <ShieldAlert size={20} />
                                <span>Upload Status</span>
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="sidebar__section">
                    <p className="sidebar__section-title">SEMESTERS</p>
                    <ul className="sidebar__menu sidebar__menu--semesters">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                            <li key={sem}>
                                <button
                                    onClick={() => {
                                        onNavigate('marketplace');
                                        if (onSemesterSelect) onSemesterSelect(sem);
                                    }}
                                    className={`sidebar__link ${activeSemester === sem ? 'active' : ''}`}
                                    style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left' }}
                                >
                                    <Book size={18} />
                                    <span>Semester {sem}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <div className="sidebar__footer">
                <ul className="sidebar__menu">
                    <li>
                        <button onClick={onLogout} className="sidebar__link sidebar__link--logout">
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
                <div className="sidebar__legal">
                    <a href="#">Privacy Policy</a>
                    <span>•</span>
                    <a href="#">Terms</a>
                </div>
            </div>
        </aside>
    );
};

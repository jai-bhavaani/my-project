import React, { useState } from 'react';
import './AppShell.css';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

interface AppShellProps {
    children: React.ReactNode;
    onLogout: () => void;
    onNavigate: (view: 'marketplace' | 'upload' | 'admin') => void;
    currentView: 'marketplace' | 'upload' | 'admin';
}

export const AppShell: React.FC<AppShellProps> = ({ children, onLogout, onNavigate, currentView }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="app-shell">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="app-shell__overlay"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Component */}
            <div className={`app-shell__sidebar-wrapper ${isMobileMenuOpen ? 'open' : ''}`}>
                <Sidebar
                    onLogout={onLogout}
                    onNavigate={onNavigate}
                    currentView={currentView}
                />
            </div>

            {/* Main Content Area */}
            <div className="app-shell__main">
                <TopNav onMenuClick={toggleMobileMenu} />

                <main className="app-shell__content">
                    {children}
                </main>
            </div>
        </div>
    );
};

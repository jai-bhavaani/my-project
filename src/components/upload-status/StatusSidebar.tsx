import React from 'react';
import './StatusSidebar.css';
import { AlertTriangle, Info } from 'lucide-react';

export const StatusSidebar: React.FC = () => {
    return (
        <aside className="moderation-sidebar">
            <div className="sidebar-panel">
                <div className="sidebar-panel__header">
                    <h3 className="sidebar-panel__title">Submission Guidelines</h3>
                    <Info size={18} className="sidebar-panel__header-icon" />
                </div>

                <p className="guideline-intro">
                    Please review our criteria to ensure your resources get approved quickly.
                </p>

                <ul className="guideline-list">
                    <li className="guideline-item">
                        <strong>Relevance:</strong> Ensure your material matches the tagged Subject and Semester explicitly.
                    </li>
                    <li className="guideline-item">
                        <strong>Quality:</strong> Notes should be legible. Screenshots and unorganized PDFs may be rejected.
                    </li>
                    <li className="guideline-item">
                        <strong>Originality:</strong> Do not upload duplicate resources already found on the Marketplace.
                    </li>
                </ul>
            </div>

            <div className="sidebar-panel sidebar-panel--warning">
                <div className="sidebar-panel__header">
                    <h3 className="sidebar-panel__title" style={{ color: '#B45309' }}>Common Rejection Reasons</h3>
                    <AlertTriangle size={18} color="#B45309" />
                </div>

                <p className="guideline-intro" style={{ color: '#92400E' }}>
                    Your file might be rejected if a moderator finds:
                </p>
                <ul className="guideline-list" style={{ color: '#92400E' }}>
                    <li className="guideline-item">A broken link, or a Google Drive link that requires access requests.</li>
                    <li className="guideline-item">Promotional or spam content.</li>
                    <li className="guideline-item">Inappropriate or non-academic material.</li>
                </ul>
            </div>
        </aside>
    );
};

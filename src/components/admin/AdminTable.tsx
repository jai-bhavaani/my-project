import React from 'react';
import './AdminTable.css';
import { ExternalLink, Check, X } from 'lucide-react';

export interface AdminQueueItem {
    id: string;
    date: string;
    studentName: string;
    studentEmail: string;
    subject: string;
    type: 'Notes' | 'PYQ' | 'Video' | 'Bank' | 'Lab';
    title: string;
    url: string;
}


const getTypeColor = (type: AdminQueueItem['type']) => {
    switch (type) {
        case 'Notes': return 'color-notes';
        case 'PYQ': return 'color-pyq';
        case 'Video': return 'color-video';
        case 'Bank': return 'color-bank';
        case 'Lab': return 'color-lab';
        default: return 'color-default';
    }
};

interface AdminTableProps {
    items: AdminQueueItem[];
    loading?: boolean;
    onAction: (id: string, action: 'approved' | 'rejected') => void;
}

export const AdminTable: React.FC<AdminTableProps> = ({ items, loading, onAction }) => {
    return (
        <div className="admin-table-wrapper">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Date Submitted</th>
                        <th>Student</th>
                        <th>Subject & Type</th>
                        <th>Resource Details</th>
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={5} className="admin-empty-state">
                                Loading moderation queue...
                            </td>
                        </tr>
                    ) : items.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="admin-empty-state">
                                No resources pending moderation. Great job!
                            </td>
                        </tr>
                    ) : (
                        items.map((item) => (
                            <tr key={item.id}>
                                <td className="col-date">{item.date}</td>

                                <td className="col-student">
                                    <p className="student-name">{item.studentName}</p>
                                    <p className="student-email">{item.studentEmail}</p>
                                </td>

                                <td className="col-subject">
                                    <p className="subject-name">{item.subject}</p>
                                    <span className={`type-tag ${getTypeColor(item.type)}`}>
                                        {item.type}
                                    </span>
                                </td>

                                <td className="col-resource">
                                    <p className="resource-title" title={item.title}>{item.title}</p>
                                </td>

                                <td className="col-actions text-right">
                                    <div className="admin-action-buttons">
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="admin-btn-action admin-btn-preview"
                                            title="Preview Resource"
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                        <button
                                            className="admin-btn-action admin-btn-reject"
                                            onClick={() => onAction(item.id, 'rejected')}
                                            title="Reject"
                                        >
                                            <X size={18} />
                                        </button>
                                        <button
                                            className="admin-btn-action admin-btn-approve"
                                            onClick={() => onAction(item.id, 'approved')}
                                            title="Approve"
                                        >
                                            <Check size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

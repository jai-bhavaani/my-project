import React, { useState } from 'react';
import './StatusTable.css';
import { ExternalLink, CheckCircle, Clock, XCircle } from 'lucide-react';

interface UploadStatusItem {
    id: string;
    date: string;
    subject: string;
    type: 'Notes' | 'PYQ' | 'Video' | 'Bank' | 'Lab';
    title: string;
    url: string;
    status: 'pending' | 'approved' | 'rejected';
    reason?: string;
}

const MOCK_DATA: UploadStatusItem[] = [
    {
        id: 'req-1',
        date: 'Oct 24, 2024',
        subject: 'Computer Networks',
        type: 'PYQ',
        title: 'Mid-Sem 2023 Solved Paper',
        url: '#',
        status: 'pending'
    },
    {
        id: 'req-2',
        date: 'Oct 20, 2024',
        subject: 'Data Structures',
        type: 'Notes',
        title: 'Graphs & Trees Comprehensive Notes',
        url: '#',
        status: 'approved'
    },
    {
        id: 'req-3',
        date: 'Oct 15, 2024',
        subject: 'Operating Systems',
        type: 'Video',
        title: 'Deadlock Handling Tutorial (Hindi)',
        url: '#',
        status: 'rejected',
        reason: 'Link requires Google Drive access request'
    }
];

const getTypeColor = (type: UploadStatusItem['type']) => {
    switch (type) {
        case 'Notes': return 'color-notes';
        case 'PYQ': return 'color-pyq';
        case 'Video': return 'color-video';
        case 'Bank': return 'color-bank';
        case 'Lab': return 'color-lab';
        default: return 'color-default';
    }
};

const StatusBadge: React.FC<{ status: UploadStatusItem['status'], reason?: string }> = ({ status, reason }) => {
    if (status === 'approved') {
        return (
            <div className="status-badge status-badge--approved">
                <CheckCircle size={14} /> <span>Approved</span>
            </div>
        );
    }
    if (status === 'rejected') {
        return (
            <div className="status-badge-container">
                <div className="status-badge status-badge--rejected">
                    <XCircle size={14} /> <span>Rejected</span>
                </div>
                {reason && <p className="status-reason">{reason}</p>}
            </div>
        );
    }
    return (
        <div className="status-badge status-badge--pending">
            <Clock size={14} /> <span>Pending</span>
        </div>
    );
};

export const StatusTable: React.FC = () => {
    const [items] = useState<UploadStatusItem[]>(MOCK_DATA);

    return (
        <div className="status-table-wrapper">
            <table className="status-table">
                <thead>
                    <tr>
                        <th>Date Submitted</th>
                        <th>Subject & Type</th>
                        <th>Resource Details</th>
                        <th>Status</th>
                        <th className="text-right">Link</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="empty-state">
                                You haven't uploaded any resources yet.
                            </td>
                        </tr>
                    ) : (
                        items.map((item) => (
                            <tr key={item.id}>
                                <td className="col-date">{item.date}</td>

                                <td className="col-subject">
                                    <p className="subject-name">{item.subject}</p>
                                    <span className={`type-tag ${getTypeColor(item.type)}`}>
                                        {item.type}
                                    </span>
                                </td>

                                <td className="col-resource">
                                    <p className="resource-title" title={item.title}>{item.title}</p>
                                </td>

                                <td className="col-status">
                                    <StatusBadge status={item.status} reason={item.reason} />
                                </td>

                                <td className="col-actions text-right">
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-action btn-preview"
                                        title="View Resource"
                                    >
                                        <ExternalLink size={18} />
                                    </a>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

import React, { useState } from 'react';
import './AdminTable.css';
import { ExternalLink, Check, X } from 'lucide-react';

interface AdminQueueItem {
    id: string;
    date: string;
    studentName: string;
    studentEmail: string;
    subject: string;
    type: 'Notes' | 'PYQ' | 'Video' | 'Bank' | 'Lab';
    title: string;
    url: string;
}

const MOCK_DATA: AdminQueueItem[] = [
    {
        id: 'req-1',
        date: 'Oct 24, 2024',
        studentName: 'Ravi Patel',
        studentEmail: 'ravi.p@student.univ.edu',
        subject: 'Computer Networks',
        type: 'PYQ',
        title: 'Mid-Sem 2023 Solved Paper',
        url: '#'
    },
    {
        id: 'req-2',
        date: 'Oct 24, 2024',
        studentName: 'Shreya Iyer',
        studentEmail: 'shreya.i@student.univ.edu',
        subject: 'Data Structures',
        type: 'Notes',
        title: 'Graphs & Trees Comprehensive Notes',
        url: '#'
    },
    {
        id: 'req-3',
        date: 'Oct 23, 2024',
        studentName: 'Aman Singh',
        studentEmail: 'aman.s@student.univ.edu',
        subject: 'Operating Systems',
        type: 'Video',
        title: 'Deadlock Handling Tutorial (Hindi)',
        url: '#'
    },
    {
        id: 'req-4',
        date: 'Oct 23, 2024',
        studentName: 'Tanvi G.',
        studentEmail: 'tanvi.g@student.univ.edu',
        subject: 'Software Engineering',
        type: 'Bank',
        title: 'Unit 1-4 Important Questions List',
        url: '#'
    }
];

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

export const AdminTable: React.FC = () => {
    const [items, setItems] = useState<AdminQueueItem[]>(MOCK_DATA);

    const handleAction = (id: string, _action: 'approve' | 'reject') => {
        // In a real app, this would be an API call updating the database.
        // For now, we simulate moderation by removing the item from the queue list.
        setItems((prev) => prev.filter(item => item.id !== id));
    };

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
                    {items.length === 0 ? (
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
                                            onClick={() => handleAction(item.id, 'reject')}
                                            title="Reject"
                                        >
                                            <X size={18} />
                                        </button>
                                        <button
                                            className="admin-btn-action admin-btn-approve"
                                            onClick={() => handleAction(item.id, 'approve')}
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

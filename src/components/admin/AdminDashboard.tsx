import React, { useState, useEffect, useMemo } from 'react';
import './AdminDashboard.css';
import { AdminTable } from './AdminTable';
import type { AdminQueueItem } from './AdminTable';
import { Clock, CheckCircle, XCircle, AlertTriangle, Info, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AdminDashboardProps {
    onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    const [items, setItems] = useState<AdminQueueItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSubject, setFilterSubject] = useState('all');

    // Global stats for KPI
    const [globalStats, setGlobalStats] = useState({ pending: 0, approved: 0, rejected: 0 });

    const fetchQueue = async () => {
        setLoading(true);
        try {
            // Fetch Pending items for the table
            const { data, error } = await supabase
                .from('resources')
                .select(`
                    id, 
                    created_at, 
                    subject, 
                    type, 
                    title, 
                    url,
                    uploader:profiles(full_name, id)
                `)
                .eq('status', 'pending')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data) {
                const formatted: AdminQueueItem[] = data.map((row: any) => {
                    const dateObj = new Date(row.created_at);
                    const dateString = dateObj.toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                    });

                    // Supabase Join typing can be tricky; we'll assume it linked properly
                    const uploaderName = row.uploader?.full_name || 'Unknown Student';
                    // We don't have email in profiles currently so we'll stub it or make it an ID
                    const uploaderEmail = row.uploader?.id ? `ID: ${row.uploader.id.slice(0, 8)}...` : 'No email attached';

                    return {
                        id: row.id,
                        date: dateString,
                        studentName: uploaderName,
                        studentEmail: uploaderEmail,
                        subject: row.subject,
                        type: row.type as any,
                        title: row.title,
                        url: row.url
                    };
                });
                setItems(formatted);

                // Set pending count from fetched rows
                setGlobalStats(prev => ({ ...prev, pending: formatted.length }));
            }

            // Execute two extra queries to get Total Approved and Total Rejected
            // Note: Optimally we'd do a grouped count in a view, but we'll do quick count queries
            const { count: approvedCount } = await supabase.from('resources').select('*', { count: 'exact', head: true }).eq('status', 'approved');
            const { count: rejectedCount } = await supabase.from('resources').select('*', { count: 'exact', head: true }).eq('status', 'rejected');

            setGlobalStats(prev => ({
                ...prev,
                approved: approvedCount || 0,
                rejected: rejectedCount || 0
            }));

        } catch (err) {
            console.error("Error fetching admin queue: ", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQueue();
    }, []);

    const handleAction = async (id: string, action: 'approved' | 'rejected') => {
        try {
            const { error } = await supabase
                .from('resources')
                .update({ status: action })
                .eq('id', id);

            if (error) throw error;

            // Remove item from local pending list optimistic update
            setItems(prev => prev.filter(item => item.id !== id));

            // Adjust local stats directly to avoid immediate re-fetch
            setGlobalStats(prev => ({
                ...prev,
                pending: prev.pending - 1,
                approved: action === 'approved' ? prev.approved + 1 : prev.approved,
                rejected: action === 'rejected' ? prev.rejected + 1 : prev.rejected
            }));

        } catch (err) {
            console.error(`Error updating resource to ${action}:`, err);
            alert("Failed to update status. See console for details.");
        }
    };

    // Apply local search and filter
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.title.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesSubject = filterSubject === 'all' ||
                item.subject.toLowerCase() === filterSubject.toLowerCase() ||
                (filterSubject === 'os' && item.subject === 'Operating Systems') ||
                (filterSubject === 'cn' && item.subject === 'Computer Networks') ||
                (filterSubject === 'ds' && item.subject === 'Data Structures');

            return matchesSearch && matchesSubject;
        });
    }, [items, searchTerm, filterSubject]);

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
                                <div className="admin-kpi-card__value">{globalStats.pending}</div>
                                <p className="admin-kpi-card__trend">In queue right now</p>
                            </div>

                            <div className="admin-kpi-card admin-kpi-card--approved">
                                <div className="admin-kpi-card__header">
                                    <h3 className="admin-kpi-card__title">Total Approved</h3>
                                    <div className="admin-kpi-card__icon-wrap"><CheckCircle size={20} /></div>
                                </div>
                                <div className="admin-kpi-card__value">{globalStats.approved}</div>
                                <p className="admin-kpi-card__trend positive">Available online</p>
                            </div>

                            <div className="admin-kpi-card admin-kpi-card--rejected">
                                <div className="admin-kpi-card__header">
                                    <h3 className="admin-kpi-card__title">Total Rejected</h3>
                                    <div className="admin-kpi-card__icon-wrap"><XCircle size={20} /></div>
                                </div>
                                <div className="admin-kpi-card__value">{globalStats.rejected}</div>
                                <p className="admin-kpi-card__trend negative">Violated guidelines</p>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="admin-controls">
                            <div className="admin-controls__search">
                                <input
                                    type="text"
                                    placeholder="Search by student, subject, or title..."
                                    className="admin-input-search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="admin-controls__filter">
                                <select
                                    className="admin-select-filter"
                                    value={filterSubject}
                                    onChange={(e) => setFilterSubject(e.target.value)}
                                >
                                    <option value="all">All Subjects</option>
                                    <option value="os">Operating Systems</option>
                                    <option value="cn">Computer Networks</option>
                                    <option value="ds">Data Structures</option>
                                </select>
                            </div>
                        </div>

                        <div className="admin-table-container">
                            <AdminTable
                                items={filteredItems}
                                loading={loading}
                                onAction={handleAction}
                            />
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

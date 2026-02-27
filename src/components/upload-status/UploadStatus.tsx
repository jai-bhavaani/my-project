import React, { useState, useEffect, useMemo } from 'react';
import './UploadStatus.css';
import { StatusKPICards } from './StatusKPICards';
import { StatusSidebar } from './StatusSidebar';
import { StatusTable } from './StatusTable';
import type { UploadStatusItem } from './StatusTable';
import { supabase } from '../../lib/supabase';

export const UploadStatus: React.FC = () => {
    const [items, setItems] = useState<UploadStatusItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSubject, setFilterSubject] = useState('all');

    useEffect(() => {
        const fetchUserUploads = async () => {
            setLoading(true);
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                const { data, error } = await supabase
                    .from('resources')
                    .select('*')
                    .eq('uploader_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;

                if (data) {
                    const formatted: UploadStatusItem[] = data.map((row: any) => {
                        // Formatting the ISO date neatly
                        const dateObj = new Date(row.created_at);
                        const dateString = dateObj.toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric'
                        });

                        return {
                            id: row.id,
                            date: dateString,
                            subject: row.subject,
                            type: row.type as any,
                            title: row.title,
                            url: row.url,
                            status: row.status,
                            reason: row.status === 'rejected' ? 'Did not meet quality guidelines or link is private.' : undefined
                        };
                    });
                    setItems(formatted);
                }
            } catch (err) {
                console.error("Error fetching upload status: ", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserUploads();
    }, []);

    // Calculate KPI Stats
    const stats = useMemo(() => {
        let pending = 0, approved = 0, rejected = 0;
        items.forEach(item => {
            if (item.status === 'pending') pending++;
            else if (item.status === 'approved') approved++;
            else if (item.status === 'rejected') rejected++;
        });
        return { pending, approved, rejected };
    }, [items]);

    // Apply local search and filter
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.subject.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesSubject = filterSubject === 'all' ||
                item.subject.toLowerCase() === filterSubject.toLowerCase() ||
                (filterSubject === 'os' && item.subject === 'Operating Systems') ||
                (filterSubject === 'cn' && item.subject === 'Computer Networks') ||
                (filterSubject === 'ds' && item.subject === 'Data Structures');

            return matchesSearch && matchesSubject;
        });
    }, [items, searchTerm, filterSubject]);

    return (
        <div className="upload-status">
            <div className="upload-status__header">
                <div>
                    <h1 className="upload-status__title">My Upload Status</h1>
                    <p className="upload-status__subtitle">Track the review process of your submitted resources before they go live on the Marketplace.</p>
                </div>
            </div>

            <div className="upload-status__layout">
                <div className="upload-status__main">
                    <StatusKPICards
                        pendingCount={stats.pending}
                        approvedCount={stats.approved}
                        rejectedCount={stats.rejected}
                    />
                    {/* Controls Area (Search & Filter) */}
                    <div className="upload-status__controls">
                        <div className="upload-status__search">
                            <input
                                type="text"
                                placeholder="Search by subject or title..."
                                className="upload-input-search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="upload-status__filter">
                            <select
                                className="upload-select-filter"
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

                    <div className="upload-status__table-container">
                        <StatusTable items={filteredItems} loading={loading} />
                    </div>

                </div>

                <aside className="upload-status__sidebar">
                    <StatusSidebar />
                </aside>
            </div>
        </div>
    );
};

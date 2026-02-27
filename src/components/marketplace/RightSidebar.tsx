import React, { useEffect, useState } from 'react';
import './RightSidebar.css';
import { Award, Upload, TrendingUp, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface TrendingItem {
    id: string;
    title: string;
    downloads: number;
}

export const RightSidebar: React.FC = () => {
    const [impactStats, setImpactStats] = useState({ points: 0, uploads: 0 });
    const [trending, setTrending] = useState<TrendingItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSidebarData = async () => {
            setLoading(true);
            try {
                // 1. Fetch Impact Stats for current user
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { count, error: countError } = await supabase
                        .from('resources')
                        .select('*', { count: 'exact', head: true })
                        .eq('uploader_id', user.id)
                        .eq('status', 'approved');

                    if (!countError && count !== null) {
                        setImpactStats({
                            uploads: count,
                            points: count * 50 // simplistic point metric
                        });
                    }
                }

                // 2. Fetch Weekly Trending (Top 3 recent approved for now)
                const { data: trendingData, error: trendingError } = await supabase
                    .from('resources')
                    .select('id, title')
                    .eq('status', 'approved')
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (!trendingError && trendingData) {
                    const formatted = trendingData.map(item => ({
                        id: item.id,
                        title: item.title,
                        downloads: Math.floor(Math.random() * 200) + 50 // Keep mock downloads for effect since we don't have analytics yet
                    })).sort((a, b) => b.downloads - a.downloads);
                    setTrending(formatted);
                }

            } catch (error) {
                console.error("Error fetching sidebar data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSidebarData();
    }, []);

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
                            <p className="stat-card__value">{loading ? '...' : impactStats.points}</p>
                            <p className="stat-card__label">Total Points</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card__icon stat-card__icon--secondary">
                            <Upload size={20} />
                        </div>
                        <div className="stat-card__info">
                            <p className="stat-card__value">{loading ? '...' : impactStats.uploads}</p>
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
                    {loading ? (
                        <p style={{ fontSize: '12px', color: '#64748B', textAlign: 'center', padding: '1rem 0' }}>Loading trends...</p>
                    ) : trending.length === 0 ? (
                        <p style={{ fontSize: '12px', color: '#64748B', textAlign: 'center', padding: '1rem 0' }}>No trending data.</p>
                    ) : (
                        trending.map((item, index) => (
                            <li key={item.id} className="trending-item">
                                <div className="trending-item__rank">{index + 1}</div>
                                <div className="trending-item__content">
                                    <p className="trending-item__title">{item.title}</p>
                                    <p className="trending-item__meta">{item.downloads} downloads</p>
                                </div>
                                <ChevronRight size={16} className="trending-item__arrow" />
                            </li>
                        ))
                    )}
                </ul>

                <button className="sidebar-panel__action">View Full Leaderboard</button>
            </div>
        </aside>
    );
};

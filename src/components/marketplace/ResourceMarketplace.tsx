import React, { useState, useEffect } from 'react';
import './ResourceMarketplace.css';
import { CategoryTabs } from './CategoryTabs';
import type { ResourceData } from './ResourceCard';
import { ResourceCard } from './ResourceCard';
import { RightSidebar } from './RightSidebar';
import { Pagination } from './Pagination';
import { supabase } from '../../lib/supabase';

export const ResourceMarketplace: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [resources, setResources] = useState<ResourceData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResources();
    }, [activeCategory]);

    const fetchResources = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('resources')
                .select(`
                    id, 
                    type, 
                    title, 
                    subject, 
                    url,
                    uploader:profiles(full_name)
                `)
                .eq('status', 'approved')
                .order('created_at', { ascending: false });

            // Apply category filter if not "All"
            if (activeCategory !== 'All') {
                // Map category label back to concise DB type if needed
                let dbType = activeCategory;
                if (activeCategory === 'Handwritten Notes') dbType = 'Notes';
                if (activeCategory === 'Previous Year Papers') dbType = 'PYQ';
                if (activeCategory === 'Question Banks') dbType = 'Bank';
                if (activeCategory === 'Video References') dbType = 'Video';
                if (activeCategory === 'Lab Manuals') dbType = 'Lab';

                query = query.eq('type', dbType);
            }

            const { data, error } = await query;
            if (error) throw error;

            if (data) {
                const formattedData: ResourceData[] = data.map((item: any) => ({
                    id: item.id,
                    type: item.type as any,
                    title: item.title,
                    subject: item.subject,
                    url: item.url,
                    uploader: item.uploader?.full_name || 'Anonymous',
                    downloads: Math.floor(Math.random() * 500) + 10 // Mock download count for UI
                }));
                setResources(formattedData);
            }
        } catch (error) {
            console.error('Error fetching resources:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="marketplace">
            <div className="marketplace__header">
                <div>
                    <h1 className="marketplace__title">Resource Marketplace</h1>
                    <p className="marketplace__subtitle">Discover study materials, past papers, and more uploaded by your peers.</p>
                </div>
            </div>

            <div className="marketplace__layout">
                <div className="marketplace__main">
                    {/* Category Tabs */}
                    <CategoryTabs
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />

                    {/* Resource Grid */}
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>
                            Loading resources...
                        </div>
                    ) : resources.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>
                            No approved resources found for this category.
                        </div>
                    ) : (
                        <div className="resource-grid">
                            {resources.map((res) => (
                                <ResourceCard key={res.id} data={res} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <Pagination />
                </div>

                <aside className="marketplace__sidebar">
                    {/* Right Sidebar */}
                    <RightSidebar />
                </aside>
            </div>
        </div>
    );
};

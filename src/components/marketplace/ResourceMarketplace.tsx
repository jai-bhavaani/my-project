import React from 'react';
import './ResourceMarketplace.css';
import { CategoryTabs } from './CategoryTabs';
import type { ResourceData } from './ResourceCard';
import { ResourceCard } from './ResourceCard';
import { RightSidebar } from './RightSidebar';
import { Pagination } from './Pagination';

const DEMO_RESOURCES: ResourceData[] = [
    { id: '1', type: 'Notes', title: 'Unit 2: OS Process Management Detailed Notes (Handwritten)', subject: 'Operating Systems', uploader: 'Ankit Kumar', downloads: 1240 },
    { id: '2', type: 'PYQ', title: 'Computer Networks End Semester 2023', subject: 'Computer Networks', uploader: 'Priya S.', downloads: 892 },
    { id: '3', type: 'Video', title: 'Complete Guide to B-Trees and AVL Trees', subject: 'Data Structures', uploader: 'Rahul M.', downloads: 2150 },
    { id: '4', type: 'Bank', title: 'DBMS Normalization Practice Set', subject: 'Database Management', uploader: 'Prof. Sharma', downloads: 540 },
    { id: '5', type: 'Lab', title: 'Java Multithreading Lab Assignments (1-5)', subject: 'Object Oriented Prog.', uploader: 'Neha G.', downloads: 310 },
    { id: '6', type: 'Notes', title: 'Software Engineering Agile Methodologies', subject: 'Software Engineering', uploader: 'Vikram', downloads: 670 }
];

export const ResourceMarketplace: React.FC = () => {
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
                    <CategoryTabs />

                    {/* Resource Grid */}
                    <div className="resource-grid">
                        {DEMO_RESOURCES.map((res) => (
                            <ResourceCard key={res.id} data={res} />
                        ))}
                    </div>

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

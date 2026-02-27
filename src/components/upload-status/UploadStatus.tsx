import React from 'react';
import './UploadStatus.css';
import { StatusKPICards } from './StatusKPICards';
import { StatusSidebar } from './StatusSidebar';
import { StatusTable } from './StatusTable';

export const UploadStatus: React.FC = () => {
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

                    <StatusKPICards />

                    {/* Controls Area (Search & Filter) */}
                    <div className="upload-status__controls">
                        <div className="upload-status__search">
                            <input
                                type="text"
                                placeholder="Search by subject..."
                                className="upload-input-search"
                            />
                        </div>
                        <div className="upload-status__filter">
                            <select className="upload-select-filter">
                                <option value="all">All Subjects</option>
                                <option value="os">Operating Systems</option>
                                <option value="cn">Computer Networks</option>
                                <option value="ds">Data Structures</option>
                            </select>
                        </div>
                    </div>

                    <div className="upload-status__table-container">
                        <StatusTable />
                    </div>

                </div>

                <aside className="upload-status__sidebar">
                    <StatusSidebar />
                </aside>
            </div>
        </div>
    );
};

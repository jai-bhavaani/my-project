import React, { useState } from 'react';
import './StandaloneUploadPage.css';
import { UploadCloud, Link as LinkIcon, FileText, CheckCircle2 } from 'lucide-react';

export const StandaloneUploadPage: React.FC = () => {
    const [activeType, setActiveType] = useState('Notes');

    const resourceTypes = [
        { id: 'Notes', label: 'Handwritten Notes', icon: FileText },
        { id: 'PYQ', label: 'Previous Year Paper', icon: FileText },
        { id: 'Bank', label: 'Question Bank', icon: FileText },
        { id: 'Video', label: 'Video Reference', icon: FileText },
        { id: 'Lab', label: 'Lab Manual', icon: FileText }
    ];

    return (
        <div className="upload-page">
            <div className="upload-page__container">
                <header className="upload-page__header">
                    <div className="upload-page__icon-wrapper">
                        <UploadCloud size={32} />
                    </div>
                    <h1 className="upload-page__title">Contribute to the Hub</h1>
                    <p className="upload-page__subtitle">
                        Help your peers by sharing your study materials. Every contribution earns you points on the leaderboard!
                    </p>
                </header>

                <form className="upload-page__form" onSubmit={(e) => e.preventDefault()}>
                    <div className="upload-section">
                        <h2 className="upload-section__title">1. Resource Details</h2>

                        <div className="form-group">
                            <label htmlFor="title">Resource Title <span className="required">*</span></label>
                            <input
                                type="text"
                                id="title"
                                placeholder="e.g. Unit 3 Complete Notes Summary"
                                className="page-input"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="page-semester">Semester <span className="required">*</span></label>
                                <select id="page-semester" className="page-input">
                                    <option value="">Select Semester</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                        <option key={sem} value={sem}>Semester {sem}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="page-subject">Subject <span className="required">*</span></label>
                                <select id="page-subject" className="page-input">
                                    <option value="">Select Subject</option>
                                    <option value="os">Operating Systems</option>
                                    <option value="cs">Computer Networks</option>
                                    <option value="ds">Data Structures</option>
                                    <option value="db">DBMS</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="upload-section">
                        <h2 className="upload-section__title">2. Resource Type</h2>

                        <div className="type-grid">
                            {resourceTypes.map((type) => {
                                const Icon = type.icon;
                                const isActive = activeType === type.id;

                                return (
                                    <button
                                        key={type.id}
                                        type="button"
                                        className={`type-card ${isActive ? 'active' : ''}`}
                                        onClick={() => setActiveType(type.id)}
                                    >
                                        <Icon size={24} className="type-card__icon" />
                                        <span className="type-card__label">{type.label}</span>
                                        {isActive && <CheckCircle2 size={16} className="type-card__check" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="upload-section">
                        <h2 className="upload-section__title">3. Add Link</h2>

                        <div className="form-group">
                            <label htmlFor="page-link">External URL <span className="required">*</span></label>
                            <div className="input-with-icon">
                                <LinkIcon size={20} className="input-icon-left" />
                                <input
                                    type="url"
                                    id="page-link"
                                    placeholder="Paste your shared Google Drive, Dropbox, or YouTube link here"
                                    className="page-input has-icon"
                                />
                            </div>
                            <p className="form-help-text">Make sure the link permissions are set to "public" or "anyone with the link".</p>
                        </div>
                    </div>

                    <div className="upload-page__actions">
                        <button type="button" className="btn-page btn-page--outline">Save Draft</button>
                        <button type="submit" className="btn-page btn-page--primary">Submit for Review</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

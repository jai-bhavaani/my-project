import React, { useState, useEffect } from 'react';
import './StandaloneUploadPage.css';
import { UploadCloud, Link as LinkIcon, FileText, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const StandaloneUploadPage: React.FC = () => {
    const [uploadMethod, setUploadMethod] = useState<'link' | 'file'>('file');
    const [activeType, setActiveType] = useState('Notes');
    const [title, setTitle] = useState('');
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [url, setUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        // Get current user
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) setUserId(user.id);
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        if (!title || !semester || !subject) {
            setErrorMsg('Please fill in all required resource details.');
            setLoading(false);
            return;
        }

        if (uploadMethod === 'link' && !url) {
            setErrorMsg('Please provide an external URL.');
            setLoading(false);
            return;
        }

        if (uploadMethod === 'file' && !selectedFile) {
            setErrorMsg('Please select a file to upload.');
            setLoading(false);
            return;
        }

        if (!userId) {
            setErrorMsg('You must be logged in to upload resources.');
            setLoading(false);
            return;
        }

        try {
            let finalUrl = url;

            // 1. Handle File Upload to Storage Bucket if applicable
            if (uploadMethod === 'file' && selectedFile) {
                const fileExt = selectedFile.name.split('.').pop();
                const fileName = `${userId}_${Date.now()}.${fileExt}`;
                const filePath = `uploads/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('resources_files')
                    .upload(filePath, selectedFile);

                if (uploadError) throw uploadError;

                // 2. Get the public URL for the uploaded file
                const { data: { publicUrl } } = supabase.storage
                    .from('resources_files')
                    .getPublicUrl(filePath);

                finalUrl = publicUrl;
            }

            // 3. Insert the record into the resources table
            const { error: insertError } = await supabase.from('resources').insert([
                {
                    title,
                    semester: parseInt(semester, 10),
                    subject,
                    type: activeType,
                    url: finalUrl,
                    uploader_id: userId
                }
            ]);

            if (insertError) throw insertError;

            setSuccessMsg('Resource submitted successfully! It is now pending review.');
            // Reset form
            setTitle('');
            setSemester('');
            setSubject('');
            setUrl('');
            setSelectedFile(null);
            setActiveType('Notes');
        } catch (err: any) {
            console.error('Upload Error:', err);
            setErrorMsg(err.message || 'An error occurred during upload.');
        } finally {
            setLoading(false);
        }
    };

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

                <form className="upload-page__form" onSubmit={handleSubmit}>
                    {errorMsg && (
                        <div style={{ backgroundColor: '#FEE2E2', color: '#DC2626', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                            {errorMsg}
                        </div>
                    )}
                    {successMsg && (
                        <div style={{ backgroundColor: '#D1FAE5', color: '#059669', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                            {successMsg}
                        </div>
                    )}
                    <div className="upload-section">
                        <h2 className="upload-section__title">1. Resource Details</h2>

                        <div className="form-group">
                            <label htmlFor="title">Resource Title <span className="required">*</span></label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Unit 3 Complete Notes Summary"
                                className="page-input"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="page-semester">Semester <span className="required">*</span></label>
                                <select
                                    id="page-semester"
                                    className="page-input"
                                    value={semester}
                                    onChange={(e) => setSemester(e.target.value)}
                                >
                                    <option value="">Select Semester</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                        <option key={sem} value={sem}>Semester {sem}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="page-subject">Subject <span className="required">*</span></label>
                                <select
                                    id="page-subject"
                                    className="page-input"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                >
                                    <option value="">Select Subject</option>
                                    <option value="Operating Systems">Operating Systems</option>
                                    <option value="Computer Networks">Computer Networks</option>
                                    <option value="Data Structures">Data Structures</option>
                                    <option value="DBMS">DBMS</option>
                                    <option value="Software Engineering">Software Engineering</option>
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
                        <div className="upload-section__header-row">
                            <h2 className="upload-section__title" style={{ borderBottom: 'none', marginBottom: 0 }}>3. Resource Content</h2>
                            <div className="upload-method-toggle">
                                <button
                                    type="button"
                                    className={`toggle-btn ${uploadMethod === 'file' ? 'active' : ''}`}
                                    onClick={() => setUploadMethod('file')}
                                >
                                    Upload File
                                </button>
                                <button
                                    type="button"
                                    className={`toggle-btn ${uploadMethod === 'link' ? 'active' : ''}`}
                                    onClick={() => setUploadMethod('link')}
                                >
                                    Link URL
                                </button>
                            </div>
                        </div>
                        <div style={{ height: '2px', backgroundColor: 'var(--color-bg-canvas)', marginBottom: '0.5rem', marginTop: '0.25rem' }}></div>

                        {uploadMethod === 'link' ? (
                            <div className="form-group animation-fade-in">
                                <label htmlFor="page-link">External URL <span className="required">*</span></label>
                                <div className="input-with-icon">
                                    <LinkIcon size={20} className="input-icon-left" />
                                    <input
                                        type="url"
                                        id="page-link"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="Paste your shared Google Drive, Dropbox, or YouTube link here"
                                        className="page-input has-icon"
                                    />
                                </div>
                                <p className="form-help-text">Make sure the link permissions are set to "public" or "anyone with the link".</p>
                            </div>
                        ) : (
                            <div className="form-group animation-fade-in">
                                <label>Upload PDF / Document <span className="required">*</span></label>
                                <div className="file-upload-dropzone">
                                    <input
                                        type="file"
                                        id="page-file"
                                        className="file-input-hidden"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                setSelectedFile(e.target.files[0]);
                                            }
                                        }}
                                        accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                                    />
                                    <label htmlFor="page-file" className="file-upload-label">
                                        <UploadCloud size={32} className="file-upload-icon" />
                                        <span className="file-upload-text">
                                            {selectedFile ? selectedFile.name : 'Click to browse or drag and drop a file'}
                                        </span>
                                        <span className="file-upload-hint">Supported: PDF, DOCX, PPT, JPG, PNG (Max 10MB)</span>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="upload-page__actions">
                        <button type="submit" className="btn-page btn-page--primary" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit for Review'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

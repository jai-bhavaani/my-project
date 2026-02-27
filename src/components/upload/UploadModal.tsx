import React, { useEffect } from 'react';
import { X, Link as LinkIcon, AlertCircle } from 'lucide-react';
import './UploadModal.css';

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
    // Prevent scrolling on the body when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="upload-modal-overlay" onClick={onClose}>
            <div className="upload-modal-content" onClick={(e) => e.stopPropagation()}>

                <div className="upload-modal__header">
                    <h2 className="upload-modal__title">Upload New Resource</h2>
                    <button className="upload-modal__close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form className="upload-modal__form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="subjectName">Subject Name</label>
                        <input
                            type="text"
                            id="subjectName"
                            placeholder="e.g. Operating Systems"
                            className="modal-input"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="semester">Semester</label>
                            <select id="semester" className="modal-input">
                                <option value="">Select Semester</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                    <option key={sem} value={sem}>Semester {sem}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="resourceType">Resource Type</label>
                            <select id="resourceType" className="modal-input">
                                <option value="">Select Type</option>
                                <option value="Notes">Handwritten Notes</option>
                                <option value="PYQ">Previous Year Paper</option>
                                <option value="Bank">Question Bank</option>
                                <option value="Video">Video Reference</option>
                                <option value="Lab">Lab Manual</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="resourceLink">Resource Link</label>
                        <div className="input-with-icon">
                            <LinkIcon size={18} className="input-icon-left" />
                            <input
                                type="url"
                                id="resourceLink"
                                placeholder="https://drive.google.com/..."
                                className="modal-input has-icon"
                            />
                        </div>
                        <p className="form-help-text">Paste a Google Drive, Dropbox, or GitHub link here.</p>
                    </div>

                    <div className="upload-modal__footer">
                        <div className="upload-warning">
                            <AlertCircle size={16} />
                            <span>Ensure your shared links are set to "Anyone with the link can view".</span>
                        </div>

                        <div className="upload-actions">
                            <button type="button" className="btn-ghost" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-solid-primary" onClick={onClose}>
                                Upload Resource
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
};

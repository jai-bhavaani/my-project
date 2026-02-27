import React from 'react';
import './ResourceCard.css';
import { DownloadCloud, Eye } from 'lucide-react';

export interface ResourceData {
    id: string;
    type: 'Notes' | 'PYQ' | 'Video' | 'Bank' | 'Lab';
    title: string;
    subject: string;
    uploader: string;
    downloads: number;
}

interface ResourceCardProps {
    data: ResourceData;
}

const getTypeColor = (type: ResourceData['type']) => {
    switch (type) {
        case 'Notes': return 'color-notes';
        case 'PYQ': return 'color-pyq';
        case 'Video': return 'color-video';
        case 'Bank': return 'color-bank';
        case 'Lab': return 'color-lab';
        default: return 'color-default';
    }
};

export const ResourceCard: React.FC<ResourceCardProps> = ({ data }) => {
    return (
        <div className="resource-card">
            <div className="resource-card__header">
                <span className={`resource-card__type ${getTypeColor(data.type)}`}>
                    {data.type}
                </span>
            </div>

            <div className="resource-card__body">
                <h3 className="resource-card__title" title={data.title}>
                    {data.title}
                </h3>
                <p className="resource-card__subject">{data.subject}</p>
            </div>

            <div className="resource-card__footer">
                <div className="resource-card__uploader">
                    <span className="uploader-label">ADDED BY</span>
                    <span className="uploader-name">{data.uploader}</span>
                </div>

                <button className="resource-card__action">
                    {data.type === 'Video' ? <Eye size={16} /> : <DownloadCloud size={16} />}
                    <span>{data.type === 'Video' ? 'View' : 'Download'}</span>
                </button>
            </div>
        </div>
    );
};

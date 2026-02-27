import React from 'react';
import './Pagination.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination: React.FC = () => {
    return (
        <div className="pagination">
            <button className="pagination__btn pagination__btn--nav" disabled>
                <ChevronLeft size={16} />
                <span>Previous</span>
            </button>

            <div className="pagination__numbers">
                <button className="pagination__btn active">1</button>
                <button className="pagination__btn">2</button>
                <button className="pagination__btn">3</button>
                <span className="pagination__ellipsis">...</span>
                <button className="pagination__btn">8</button>
            </div>

            <button className="pagination__btn pagination__btn--nav">
                <span>Next</span>
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

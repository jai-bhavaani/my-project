import React from 'react';
import './StatusKPICards.css';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

export const StatusKPICards: React.FC = () => {
    return (
        <div className="kpi-cards">

            <div className="kpi-card kpi-card--pending">
                <div className="kpi-card__header">
                    <h3 className="kpi-card__title">My Pending</h3>
                    <div className="kpi-card__icon-wrap">
                        <Clock size={20} />
                    </div>
                </div>
                <div className="kpi-card__value">2</div>
                <p className="kpi-card__trend">In queue right now</p>
            </div>

            <div className="kpi-card kpi-card--approved">
                <div className="kpi-card__header">
                    <h3 className="kpi-card__title">Approved</h3>
                    <div className="kpi-card__icon-wrap">
                        <CheckCircle size={20} />
                    </div>
                </div>
                <div className="kpi-card__value">14</div>
                <p className="kpi-card__trend positive">Available in Marketplace</p>
            </div>

            <div className="kpi-card kpi-card--rejected">
                <div className="kpi-card__header">
                    <h3 className="kpi-card__title">Rejected</h3>
                    <div className="kpi-card__icon-wrap">
                        <XCircle size={20} />
                    </div>
                </div>
                <div className="kpi-card__value">1</div>
                <p className="kpi-card__trend negative">Action required</p>
            </div>

        </div>
    );
};

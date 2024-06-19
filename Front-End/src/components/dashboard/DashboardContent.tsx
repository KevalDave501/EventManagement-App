import React from 'react';
import AllUsers from './AllUsers';
import Event from '../events/Event';
import DashboardData from './DashboardData';

interface DashboardContentProps {
    activeTab: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ activeTab }) => {
    return (
        <div className="dashboard-content">
            {activeTab === 'dashboard' && (
                <div className="dashboard-section">
                    < DashboardData />
                </div>
            )}
            {activeTab === 'allUsers' && (
                <div className="dashboard-section">
                    <AllUsers />
                </div>
            )}
            {activeTab === 'events' && (
                <div className="dashboard-section">
                    <Event />
                </div>
            )}
        </div>
    );
}

export default DashboardContent;

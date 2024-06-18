import React from 'react';
import AllUsers from './AllUsers';
import Event from '../events/Event';

interface DashboardContentProps {
    activeTab: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ activeTab }) => {
    return (
        <div className="dashboard-content">
            {activeTab === 'dashboard' && (
                <div className="dashboard-section">
                    <h2>Dashboard Overview</h2>
                    <p>Welcome back, Admin!</p>
                    <p>Here you can view important statistics and reports.</p>
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

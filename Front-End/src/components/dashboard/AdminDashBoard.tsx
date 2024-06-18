import React, { useState } from 'react';
import './AdminDashboard.css';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('dashboard');

    const handleSidebarClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="admin-dashboard">
            <Sidebar activeTab={activeTab} handleSidebarClick={handleSidebarClick} />
            <div className="content-wrapper">
                <header className="custom-header">
                </header>
                <main className="main-content">
                    <DashboardContent activeTab={activeTab} />
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;

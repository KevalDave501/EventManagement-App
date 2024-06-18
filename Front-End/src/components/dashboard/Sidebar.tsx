import React from 'react';

interface SidebarProps {
    activeTab: string;
    handleSidebarClick: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, handleSidebarClick }) => {
    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <h3>Admin Panel</h3>
            </div>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => handleSidebarClick('dashboard')}>
                        Dashboard
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'allUsers' ? 'active' : ''}`} onClick={() => handleSidebarClick('allUsers')}>
                        All Users
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'events' ? 'active' : ''}`} onClick={() => handleSidebarClick('events')}>
                        Events
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;

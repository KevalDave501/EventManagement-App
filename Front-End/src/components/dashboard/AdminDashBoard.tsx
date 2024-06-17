import React, { useState } from 'react';
import AllUsers from './AllUsers';
import Event from '../events/Event';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
    const [displayText, setDisplayText] = useState("");
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [showEvents, setShowEvents] = useState(false);

    const handleButtonClick = (text: string) => {
        setDisplayText(text);
        if (text === "All Users") {
            setShowAllUsers(true);
            setShowEvents(false);
        } else if (text === "Events") {
            setShowAllUsers(false);
            setShowEvents(true);
        } else {
            setShowAllUsers(false);
            setShowEvents(false);
        }
    };

    return (
        <div className="admin-dashboard">
            <header className="custom-header d-flex justify-content-between align-items-center p-3 mb-4 header">
                <h1 className="text-white">Admin Dashboard</h1>
                <div>
                    <button className="btn btn-custom mx-2" onClick={() => handleButtonClick("Go to All Users")}>Home/Dashboard</button>
                    <button className="btn btn-custom mx-2" onClick={() => handleButtonClick("All Users")}>All Users</button>
                    <button className="btn btn-custom mx-2" onClick={() => handleButtonClick("Events")}>Events</button>
                </div>
            </header>
            {displayText && <h3 className="text-center mt-4">{displayText}</h3>}
            {showAllUsers && <AllUsers />}
            {showEvents && <Event />}
        </div>
    );
}

export default AdminDashboard;

import React, { useState } from 'react';
import AllUsers from './AllUsers';

const AdminDashboard: React.FC = () => {
    const [displayText, setDisplayText] = useState("");
    const [showAllUsers, setShowAllUsers] = useState(false);

    const handleButtonClick = (text: string) => {
        setDisplayText(text);
        if (text === "All Users") {
            setShowAllUsers(true);
        } else {
            setShowAllUsers(false);
        }
    };

    return (
        <div>
            <header className="bg-info d-flex justify-content-between align-items-center p-3 mb-4">
                <h1 className="text-white">Welcome to Admin Dashboard</h1>
                <div>
                    <button className="btn btn-outline-dark mr-2" onClick={() => handleButtonClick("Go to All Users")}>Home/Dashboard</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-outline-dark mr-2" onClick={() => handleButtonClick("All Users")}>All Users</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-outline-dark" onClick={() => handleButtonClick("Go to All Users")}>Events</button>
                </div>
            </header>
            {displayText && <h3>{displayText}</h3>}
            {showAllUsers && <AllUsers />}
        </div>
    );
}

export default AdminDashboard;

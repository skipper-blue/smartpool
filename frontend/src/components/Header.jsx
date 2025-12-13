import React from 'react';
import '../assets/css/Header.css';

function Header({ title, toggleSidebar, isSidebarOpen }) {
    
    // Logic to generate the date format: "Sunday, Nov 30, 2025"
    const formattedDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric'
    });

    return (
        <header className="top-header">
            
            {/* LEFT SIDE: Toggle Button + Title + Date */}
            <div className="header-left">
                
                {/* Toggle Button */}
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <i className={`fa-solid ${isSidebarOpen ? 'fa-align-left' : 'fa-bars'}`}></i>
                </button>

                {/* Page Title & Date Stack */}
                <div className="page-info">
                    <h2 id="page-header">{title}</h2>
                    <span id="current-date">{formattedDate}</span>
                </div>
            </div>

            {/* RIGHT SIDE: Notifications + Avatar */}
            <div className="header-right">
                
                {/* Notification Bell with Red Dot */}
                <div className="notification-wrapper">
                    <button className="icon-btn">
                        <i className="fa-regular fa-bell"></i>
                    </button>
                    <span className="badge-dot"></span>
                </div>

                {/* User Avatar */}
                <div className="user-profile">
                    <div className="avatar">SA</div>
                </div>
            </div>
        </header>
    );
}

export default Header;
import React from 'react';
import '../assets/css/Header.css';

function Header({ title, toggleSidebar }) {
    
    // Optional: Dynamic Date logic to replace the hardcoded HTML
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
    });

    return (
        <header className="top-header">
            {/* Inline styles in React must be objects, not strings */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                
                {/* 1. use onClick (camelCase) 
                    2. call the function passed via props */}
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                
                <div className="page-title">
                    {/* Display the title passed from parent state */}
                    <h2 id="page-header">{title}</h2>
                    <span id="current-date">{currentDate}</span>
                </div>
            </div>

            <div className="user-menu">
                <div className="icon-btn">
                    <i className="fa-regular fa-bell"></i>
                    <div className="badge"></div>
                </div>
                <div className="avatar">SA</div>
            </div>
        </header>
    );
}

export default Header;
import React from 'react';
import '../assets/css/Header.css';

function Header({ title, toggleSidebar, isSidebarOpen }) {
    return (
        <header className="top-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                
                {/* --- TOGGLE BUTTON --- 
                    This single button handles both Desktop and Mobile interactions.
                    - Desktop: Collapses/Expands sidebar
                    - Mobile: Opens the sidebar overlay
                */}
                <button className="toggle-btn" onClick={toggleSidebar}>
                    {/* Logic: 
                        If sidebar is open, show 'align-left' (collapse icon).
                        If sidebar is closed (or on mobile), show 'bars'. 
                    */}
                    <i className={`fa-solid ${isSidebarOpen ? 'fa-align-left' : 'fa-bars'}`}></i>
                </button>

                <div className="page-title">
                    <h2 id="page-header">{title}</h2>
                    {/* Optional: Add date here if needed */}
                </div>
            </div>

            <div className="user-menu">
                <div className="icon-btn">
                    <i className="fa-regular fa-bell"></i>
                    <div className="badge"></div>
                </div>
                <div className="avatar">AD</div>
            </div>
        </header>
    );
}

export default Header;
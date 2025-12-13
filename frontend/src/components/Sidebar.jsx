import React from 'react';
import '../assets/css/sidebar.css';

// We accept props to control the state from the parent
function Sidebar({ activeTab, setActiveTab, isMobileOpen, closeMobileSidebar }) {
    
    // Helper to handle click
    const handleNavigation = (viewId) => {
        setActiveTab(viewId);
        
        // Mobile handling: close sidebar if screen is small
        if (window.innerWidth <= 900) {
            closeMobileSidebar();
        }
    };

    return (
        <>
            {/* Add the 'show' class conditionally based on the isMobileOpen prop 
            */}
            <aside className={`sidebar ${isMobileOpen ? 'show' : ''}`} id="sidebar">
                <div className="brand">
                    <i className="fa-solid fa-billiards"></i> SMARTPOOL
                </div>

                <div className="nav-scroller">
                    <div className="nav-label">Management</div>
                    
                    <a 
                        className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} 
                        onClick={() => handleNavigation('dashboard')}
                    >
                        <i className="fa-solid fa-chart-pie"></i> Dashboard
                    </a>
                    
                    <a 
                        className={`nav-item ${activeTab === 'owners' ? 'active' : ''}`} 
                        onClick={() => handleNavigation('owners')}
                    >
                        <i className="fa-solid fa-users"></i> Owners
                    </a>
                    
                    <a 
                        className={`nav-item ${activeTab === 'tables' ? 'active' : ''}`} 
                        onClick={() => handleNavigation('tables')}
                    >
                        <i className="fa-solid fa-server"></i> Tables
                    </a>

                    <div className="nav-label">Finance</div>
                    
                    <a 
                        className={`nav-item ${activeTab === 'transactions' ? 'active' : ''}`} 
                        onClick={() => handleNavigation('transactions')}
                    >
                        <i className="fa-solid fa-money-bill-transfer"></i> Transactions
                    </a>
                    
                    <a 
                        className={`nav-item ${activeTab === 'settlements' ? 'active' : ''}`} 
                        onClick={() => handleNavigation('settlements')}
                    >
                        <i className="fa-solid fa-file-invoice-dollar"></i> Settlements
                    </a>

                    <div className="nav-label">System</div>
                    
                    <a 
                        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} 
                        onClick={() => handleNavigation('settings')}
                    >
                        <i className="fa-solid fa-gear"></i> Settings
                    </a>
                </div>
            </aside>

            {/* Overlay for mobile view */}
            <div 
                id="overlay" 
                className={isMobileOpen ? 'show' : ''} 
                onClick={closeMobileSidebar}
            ></div>
        </>
    );
}

export default Sidebar;
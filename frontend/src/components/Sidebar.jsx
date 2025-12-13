import React from 'react';
import '../assets/css/sidebar.css';

function Sidebar({ activeTab, setActiveTab, isOpen, closeMobileSidebar }) {
    
    // --- THE LOGIC ---
    const handleNavigation = (viewId) => {
        // 1. Switch the Page View
        setActiveTab(viewId);
        
        // 2. Check screen size and close sidebar if on mobile
        // (We assume mobile is 900px or less based on your CSS)
        if (window.innerWidth <= 900) {
            closeMobileSidebar();
        }
    };

    return (
        <>
            <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`} id="sidebar">
                <div className="brand">
                    <i className="fa-solid fa-billiards"></i> SMARTPOOL
                </div>

                <div className="nav-scroller">
                    <div className="nav-label">Management</div>
                    
                    {/* Use arrow functions to pass the ID to handleNavigation 
                    */}
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

            {/* Overlay to close sidebar when clicking outside */}
            <div 
                className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
                onClick={closeMobileSidebar}
            ></div>
        </>
    );
}

export default Sidebar;
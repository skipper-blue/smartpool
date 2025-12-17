import React from 'react';
import '../assets/css/sidebar.css';
// Ensure this path matches your actual file (jpg, png, or svg)
import logo from '../assets/img/logo.jpg'; 

function Sidebar({ activeTab, setActiveTab, isOpen, closeMobileSidebar }) {
    
    const handleNavigation = (viewId) => {
        setActiveTab(viewId);
        if (window.innerWidth <= 900) {
            closeMobileSidebar();
        }
    };

    return (
        <>
            <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`} id="sidebar">
                
                {/* --- LOGO ONLY SECTION --- */}
                <div className="brand-centered">
                    <img src={logo} alt="SmartPool" className="sidebar-logo-main" />
                </div>
                {/* ------------------------- */}

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
                        className={`nav-item ${activeTab === 'control' ? 'active' : ''}`} 
                        onClick={() => handleNavigation('control')}
                    >
                        <i className="fa-solid fa-gamepad"></i> Control Center
                    </a>

                    <a 
                        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} 
                        onClick={() => handleNavigation('settings')}
                    >
                        <i className="fa-solid fa-gear"></i> Settings
                    </a>
                </div>
            </aside>

            <div 
                className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
                onClick={closeMobileSidebar}
            ></div>
        </>
    );
}

export default Sidebar;
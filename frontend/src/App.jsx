import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Import your real pages
import Dashboard from './pages/Dashboard';
import OwnersPage from './pages/OwnersPage'; // Ensure you have this file created
import TablesPage from './pages/TablesPage';
import ControlCenter from './pages/ControlCenter';

// --- PLACEHOLDER COMPONENT ---
// This handles pages you haven't built yet (Tables, Settings, etc.)
// so the app doesn't crash when you click them.
const PlaceholderPage = ({ title }) => (
    <div className="scroll-area fade-in">
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px', opacity: 0.5 }}>
                <i className="fa-solid fa-screwdriver-wrench"></i>
            </div>
            <h2 style={{ color: '#0f172a' }}>{title}</h2>
            <p>This module is under construction.</p>
        </div>
    </div>
);

function App() {
    // 1. State to track which page is currently active
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toggle Sidebar (Mobile)
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Close Sidebar (Mobile) when a link is clicked
    const closeMobileSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="app-container">
            {/* 2. Navigation Sidebar */}
            <Sidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                isOpen={isSidebarOpen} 
                closeMobileSidebar={closeMobileSidebar}
            />

            {/* 3. Main Content Area */}
            <div className="main-content">
                <Header 
                    title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} 
                    toggleSidebar={toggleSidebar} 
                    isSidebarOpen={isSidebarOpen}
                />

                {/* 4. THE ROUTER LOGIC: Switch pages based on activeTab */}
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'owners' && <OwnersPage />}

                
                {/* Placeholders for future pages */}
                {activeTab === 'tables' && <TablesPage/>}
                {activeTab === 'control' && <ControlCenter />}
                {activeTab === 'transactions' && <PlaceholderPage title="Transaction History" />}
                {activeTab === 'settlements' && <PlaceholderPage title="Settlements" />}
                {activeTab === 'settings' && <PlaceholderPage title="System Settings" />}
            </div>
        </div>
    );
}

export default App;
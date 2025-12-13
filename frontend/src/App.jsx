import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css'; // Import the CSS from above

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        // 1. The Flex Container
        <div className="app-container">
            
            {/* 2. Left Side: Sidebar */}
            <Sidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                isMobileOpen={isSidebarOpen} 
                closeMobileSidebar={() => setIsSidebarOpen(false)}
            />

            {/* 3. Right Side: Wrapper for Header + Content */}
            <main className="main-content">
                
                {/* A. Header at the top */}
                <Header 
                    title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} 
                    toggleSidebar={toggleSidebar} 
                />

                {/* B. Scrollable Content Body below Header */}
                <div className="content-body">
                    {/* Your dynamic content goes here */}
                    <h1>Welcome to {activeTab}</h1>
                    <p>This area will scroll while the sidebar and header stay in place.</p>
                </div>

            </main>
        </div>
    );
}

export default App;
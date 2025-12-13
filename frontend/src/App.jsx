import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css'; 

function App() {
    // Default to true (open) on desktop, false (closed) on mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 900);
    const [activeTab, setActiveTab] = useState('dashboard');
    
    // Use this ONLY if you want the sidebar to close even on big screens
    const handleNavigation = (viewId) => {
        setActiveTab(viewId);
        closeMobileSidebar(); // This will close it regardless of screen size
    };

    // Handle window resize to auto-close on mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 900) setIsSidebarOpen(false);
            else setIsSidebarOpen(true);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="app-container">
            {/* Sidebar Logic */}
           
            <Sidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                isOpen={isSidebarOpen} 
                // This function tells the state to set isSidebarOpen to false
                closeMobileSidebar={() => setIsSidebarOpen(false)} 
            />

            {/* Main Content Logic */}
            <main className={`main-content ${isSidebarOpen ? '' : 'full-width'}`}>
                
                <Header 
                    title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} 
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                />

                <div className="content-body">
                    <h1>Admin Dashboard</h1>
                    <p>Sidebar is currently: <b>{isSidebarOpen ? 'Open' : 'Hidden'}</b></p>
                    <p>Click the button in the top left to toggle it.</p>
                </div>
            </main>
        </div>
    );
}

export default App;
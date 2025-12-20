import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/ControlCenter.css';
import { mockData } from '../data/mockData';

// --- MOCK DATA - now from common data file ---
const MOCK_DEVICES = mockData.devices;

const ControlCenter = ({ initialDeviceId }) => {
    // --- STATE ---
    const [selectedDevice, setSelectedDevice] = useState(MOCK_DEVICES[0]);
    const [activeTab, setActiveTab] = useState('overview'); 
    const [logs, setLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [configForm, setConfigForm] = useState({});
    
    // UI State
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('app_theme') || 'dark');

    const bottomRef = useRef(null);

    // --- EFFECTS ---
    
    // Persist Theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('app_theme', theme);
    }, [theme]);

    useEffect(() => {
        if (initialDeviceId) {
            const found = MOCK_DEVICES.find(d => d.id === initialDeviceId);
            if (found) setSelectedDevice(found);
        }
    }, [initialDeviceId]);

    useEffect(() => {
        if (selectedDevice) {
            setConfigForm(selectedDevice.config);
            setLogs([]); 
            addLog(`Established secure connection to ${selectedDevice.ip}`, 'SYS');
            setMobileMenuOpen(false); // Close drawer on selection
        }
    }, [selectedDevice]);

    useEffect(() => {
        if (!selectedDevice || selectedDevice.status === 'Offline') return;
        const interval = setInterval(() => {
            const msgs = ['Voltage Stable', 'Ping OK (24ms)', 'Syncing DB...', 'Heartbeat ACK'];
            const msg = msgs[Math.floor(Math.random() * msgs.length)];
            addLog(msg, 'RX');
        }, 3500);
        return () => clearInterval(interval);
    }, [selectedDevice]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    // --- LOGIC ---
    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const addLog = (msg, type) => {
        const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
        setLogs(prev => [...prev, { time, msg, type }]);
    };

    const handleSaveConfig = (e) => {
        e.preventDefault();
        setIsSaving(true);
        addLog(`Uploading new configuration package...`, 'TX');
        setTimeout(() => {
            setIsSaving(false);
            addLog(`Config Update Success: Price set to ${configForm.pricePerGame}`, 'RX');
            alert('Settings updated successfully.');
        }, 1500);
    };

    const getSignalColor = (sig) => {
        if (sig === 0) return 'var(--status-offline)';
        if (sig > -60) return 'var(--status-online)';
        if (sig > -80) return 'var(--status-busy)';
        return 'var(--status-error)';
    };

    // --- RENDERERS ---

    const renderOverview = () => (
        <div className="widget-grid animate-fade-in">
            {/* Battery Widget */}
            <div className="widget-card glow-card">
                <div className="widget-header">
                    <span className="widget-title">Power System</span>
                    <div className="icon-box yellow"><i className="fa-solid fa-bolt"></i></div>
                </div>
                <div className="widget-body center-content">
                    <div className="circular-indicator">
                        <i className="fa-solid fa-car-battery fa-2x" style={{ color: selectedDevice.voltage > 11 ? 'var(--status-online)' : 'var(--status-busy)' }}></i>
                        <h2 className="value-display">{selectedDevice.voltage}<span className="unit">V</span></h2>
                    </div>
                </div>
                <div className="widget-footer">
                    <div className="progress-container">
                        <div className="progress-label"><span>Battery Level</span><span>{selectedDevice.voltage > 0 ? '85%' : '0%'}</span></div>
                        <div className="progress-track"><div className="progress-fill" style={{ width: selectedDevice.voltage > 0 ? '85%' : '0%', background: 'var(--status-online)' }}></div></div>
                    </div>
                </div>
            </div>

            {/* Signal Widget */}
            <div className="widget-card glow-card">
                 <div className="widget-header">
                    <span className="widget-title">Network Telemetry</span>
                    <div className="icon-box blue"><i className="fa-solid fa-tower-broadcast"></i></div>
                </div>
                <div className="widget-body center-content">
                     <div className="circular-indicator">
                        <i className="fa-solid fa-signal fa-2x" style={{ color: getSignalColor(selectedDevice.signal) }}></i>
                        <h2 className="value-display">{selectedDevice.signal}<span className="unit">dBm</span></h2>
                    </div>
                </div>
                <div className="widget-footer">
                    <div className="progress-container">
                        <div className="progress-label"><span>Signal Quality</span><span>Good</span></div>
                        <div className="progress-track"><div className="progress-fill" style={{ width: '75%', background: getSignalColor(selectedDevice.signal) }}></div></div>
                    </div>
                </div>
            </div>

            {/* Actions Widget */}
            <div className="widget-card full-width">
                <div className="widget-header">
                    <span className="widget-title">Command Interface</span>
                    <div className="icon-box purple"><i className="fa-solid fa-gamepad"></i></div>
                </div>
                <div className="action-grid">
                    <button className="action-btn primary" onClick={() => addLog('CMD: UNLOCK sent', 'TX')}>
                        <i className="fa-solid fa-unlock-keyhole"></i> <span>Unlock</span>
                    </button>
                    <button className="action-btn danger" onClick={() => addLog('CMD: LOCK sent', 'TX')}>
                        <i className="fa-solid fa-lock"></i> <span>Lock Device</span>
                    </button>
                    <button className="action-btn secondary" onClick={() => addLog('CMD: REBOOT sent', 'TX')}>
                        <i className="fa-solid fa-power-off"></i> <span>Reboot</span>
                    </button>
                    <button className="action-btn secondary" onClick={() => addLog('CMD: PING sent', 'TX')}>
                        <i className="fa-solid fa-satellite-dish"></i> <span>Ping</span>
                    </button>
                </div>
            </div>
        </div>
    );

    const renderConsole = () => (
        <div className="animate-fade-in terminal-wrapper">
            <div className="terminal-window">
                <div className="terminal-header">
                    <div className="terminal-controls">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                    <div className="terminal-title">root@{selectedDevice.ip}:~</div>
                    <button className="clear-btn" onClick={() => setLogs([])}>CLEAR</button>
                </div>
                <div className="terminal-content">
                    {logs.map((log, idx) => (
                        <div key={idx} className="log-line">
                            <span className="log-time">[{log.time}]</span>
                            {log.type === 'TX' && <span className="log-tx">➜ TX:</span>}
                            {log.type === 'RX' && <span className="log-rx">➜ RX:</span>}
                            {log.type === 'SYS' && <span className="log-sys">➜ SYS:</span>}
                            <span className="log-msg">{log.msg}</span>
                        </div>
                    ))}
                    <div ref={bottomRef}></div>
                </div>
            </div>
            <div className="terminal-input-area">
                <span className="prompt">{'>'}</span>
                <input type="text" placeholder="Enter command..." className="cmd-input" />
                <button className="btn-send">EXECUTE</button>
            </div>
        </div>
    );

    const renderConfig = () => (
        <div className="animate-fade-in widget-card config-card">
            <div className="widget-header">
                <span className="widget-title">Remote Configuration</span>
                <div className="icon-box"><i className="fa-solid fa-sliders"></i></div>
            </div>
            <form onSubmit={handleSaveConfig} className="config-form">
                <div className="form-group">
                    <label>Game Price (KES)</label>
                    <div className="input-icon-wrapper">
                        <i className="fa-solid fa-money-bill"></i>
                        <input 
                            type="number" 
                            value={configForm.pricePerGame || ''} 
                            onChange={(e) => setConfigForm({...configForm, pricePerGame: e.target.value})}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Sleep Timer (Minutes)</label>
                    <div className="input-icon-wrapper">
                        <i className="fa-regular fa-clock"></i>
                        <input 
                            type="number" 
                            value={configForm.sleepTimer || ''} 
                            onChange={(e) => setConfigForm({...configForm, sleepTimer: e.target.value})}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Audio Volume ({configForm.volume}%)</label>
                    <input 
                        type="range" 
                        min="0" max="100" 
                        className="range-slider"
                        value={configForm.volume || 50} 
                        onChange={(e) => setConfigForm({...configForm, volume: e.target.value})}
                    />
                </div>
                <button type="submit" className="action-btn primary full-width" disabled={isSaving}>
                    {isSaving ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-floppy-disk"></i>} 
                    {isSaving ? ' Uploading...' : ' Save Changes'}
                </button>
            </form>
        </div>
    );

    const renderMap = () => (
        <div className="animate-fade-in widget-card map-card">
             <div className="widget-header">
                <span className="widget-title">Geospatial Tracking</span>
                <div className="icon-box green"><i className="fa-solid fa-location-crosshairs"></i></div>
            </div>
            <div className="map-placeholder">
                <div className="radar-scan"></div>
                <div className="map-grid"></div>
                <div className="map-pin">
                    <div className="pin-pulse"></div>
                    <i className="fa-solid fa-map-pin"></i>
                </div>
                <div className="map-overlay-info">
                    <strong>LAT:</strong> -1.2921 <br/>
                    <strong>LNG:</strong> 36.8219
                </div>
            </div>
        </div>
    );

    // --- MAIN RENDER ---
    return (
        <div className="cc-container">
            {/* Mobile Header */}
            <header className="mobile-header">
                <div className="brand">
                    <i className="fa-brands fa-hive"></i> IOT CONTROL
                </div>
                <div className="header-actions">
                    <button className="theme-toggle" onClick={toggleTheme}>
                        <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                    </button>
                    <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </header>

            <div className="cc-layout">
                {/* LEFT: Device List Sidebar */}
                <aside className={`cc-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
                    <div className="sidebar-header">
                        <h3>Devices Online</h3>
                        <span className="badge">{MOCK_DEVICES.length}</span>
                    </div>
                    <div className="sidebar-search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input 
                            type="text" 
                            placeholder="Filter ID..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="sidebar-list">
                        {MOCK_DEVICES.filter(d => d.id.toLowerCase().includes(searchTerm.toLowerCase())).map(device => (
                            <div 
                                key={device.id} 
                                className={`device-row ${selectedDevice?.id === device.id ? 'active' : ''}`}
                                onClick={() => setSelectedDevice(device)}
                            >
                                <div className="device-info">
                                    <div className="d-flex-between">
                                        <span className="device-id">{device.id}</span>
                                        <span className={`status-pill ${device.status.toLowerCase()}`}>{device.status}</span>
                                    </div>
                                    <span className="device-name">{device.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Desktop Theme Toggle (Bottom of sidebar) */}
                    <div className="sidebar-footer">
                        <button className="theme-btn-wide" onClick={toggleTheme}>
                            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                            <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                        </button>
                        <small className="version">System v3.0.1 Connected</small>
                    </div>
                </aside>

                {/* OVERLAY for Mobile */}
                {mobileMenuOpen && <div className="sidebar-overlay" onClick={() => setMobileMenuOpen(false)}></div>}

                {/* RIGHT: Cockpit */}
                <main className="cc-main">
                    {selectedDevice ? (
                        <>
                            {/* Cockpit Header */}
                            <header className="cockpit-header">
                                <div className="ch-info">
                                    <h1>{selectedDevice.id}</h1>
                                    <div className="ch-meta">
                                        <span><i className="fa-solid fa-fingerprint"></i> {selectedDevice.mac}</span>
                                        <span className="divider">/</span>
                                        <span><i className="fa-solid fa-clock"></i> {selectedDevice.uptime}</span>
                                    </div>
                                </div>
                                <div className="ch-status-wrapper">
                                    <div className="ch-status-indicator">
                                        <div className={`indicator-light ${selectedDevice.status === 'Offline' ? 'off' : 'on'}`}></div>
                                        <span>{selectedDevice.status.toUpperCase()}</span>
                                    </div>
                                    {/* Desktop header theme toggle can go here if preferred, but sidebar is cleaner */}
                                </div>
                            </header>

                            {/* Tabs */}
                            <nav className="cockpit-nav">
                                {['overview', 'console', 'config', 'map'].map(tab => (
                                    <button 
                                        key={tab}
                                        className={`nav-item ${activeTab === tab ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </nav>

                            {/* Content */}
                            <div className="cockpit-viewport">
                                {activeTab === 'overview' && renderOverview()}
                                {activeTab === 'console' && renderConsole()}
                                {activeTab === 'config' && renderConfig()}
                                {activeTab === 'map' && renderMap()}
                            </div>
                        </>
                    ) : (
                        <div className="empty-state">
                            <i className="fa-solid fa-satellite fa-spin-pulse"></i>
                            <h3>Select a Unit</h3>
                            <p>Choose a device from the sidebar to establish telemetry.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ControlCenter;
import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/ControlCenter.css';

// 1. ADVANCED MOCK DATA (Includes Coordinates & Configs)
const MOCK_DEVICES = [
    { 
        id: 'T-101', name: 'Nairobi West - Bar A', status: 'Online', 
        ip: '192.168.1.101', mac: '00:1A:2B:3C:4D:5E', firmware: 'v2.4.1', 
        voltage: 12.4, signal: -55, uptime: '4d 12h',
        config: { pricePerGame: 50, sleepTimer: 10, volume: 80 }
    },
    { 
        id: 'T-102', name: 'Nairobi West - Bar A', status: 'Busy', 
        ip: '192.168.1.102', mac: '00:1A:2B:3C:4D:5F', firmware: 'v2.4.0', 
        voltage: 11.8, signal: -62, uptime: '12h 30m',
        config: { pricePerGame: 50, sleepTimer: 15, volume: 60 }
    },
    { 
        id: 'T-205', name: 'Kasarani - Club Z', status: 'Offline', 
        ip: '192.168.2.005', mac: '00:1A:2B:3C:4D:88', firmware: 'v2.4.1', 
        voltage: 0, signal: 0, uptime: '0m',
        config: { pricePerGame: 40, sleepTimer: 5, volume: 100 }
    },
];

const ControlCenter = ({ initialDeviceId }) => {
    // State
    const [selectedDevice, setSelectedDevice] = useState(MOCK_DEVICES[0]);
    const [activeTab, setActiveTab] = useState('overview'); // overview, console, config, map
    const [logs, setLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    
    // Config Form State
    const [configForm, setConfigForm] = useState({});

    const bottomRef = useRef(null);

    // --- EFFECT: Handle Initial Navigation & Selection ---
    useEffect(() => {
        if (initialDeviceId) {
            const found = MOCK_DEVICES.find(d => d.id === initialDeviceId);
            if (found) setSelectedDevice(found);
        }
    }, [initialDeviceId]);

    // --- EFFECT: Reset Config Form on Device Change ---
    useEffect(() => {
        if (selectedDevice) {
            setConfigForm(selectedDevice.config);
            setLogs([]); // Clear logs for new device
            addLog(`Established connection to ${selectedDevice.ip}`, 'SYS');
        }
    }, [selectedDevice]);

    // --- EFFECT: Simulate Live Logs ---
    useEffect(() => {
        if (!selectedDevice || selectedDevice.status === 'Offline') return;
        
        const interval = setInterval(() => {
            const msgs = ['Voltage Stable', 'Ping OK (24ms)', 'Syncing DB...', 'Heartbeat'];
            const msg = msgs[Math.floor(Math.random() * msgs.length)];
            addLog(msg, 'RX');
        }, 3500);

        return () => clearInterval(interval);
    }, [selectedDevice]);

    // Scroll to bottom of logs
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    // --- LOGIC HELPERS ---
    const addLog = (msg, type) => {
        const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
        setLogs(prev => [...prev, { time, msg, type }]);
    };

    const handleSaveConfig = (e) => {
        e.preventDefault();
        setIsSaving(true);
        addLog(`Uploading new configuration...`, 'TX');
        
        setTimeout(() => {
            setIsSaving(false);
            addLog(`Config Update Success: Price set to ${configForm.pricePerGame}`, 'RX');
            alert('Settings updated successfully on device.');
        }, 1500);
    };

    const getSignalColor = (sig) => {
        if (sig === 0) return 'gray';
        if (sig > -60) return '#10b981'; // Green
        if (sig > -80) return '#f59e0b'; // Orange
        return '#ef4444'; // Red
    };

    // --- RENDERERS ---
    
    // 1. OVERVIEW TAB
    const renderOverview = () => (
        <div className="widget-grid fade-in">
            {/* Battery Widget */}
            <div className="widget-card">
                <div className="widget-title">Power System</div>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <i className="fa-solid fa-car-battery fa-3x" style={{ color: selectedDevice.voltage > 11 ? '#10b981' : '#f59e0b' }}></i>
                    <h2 style={{ margin: '10px 0 0' }}>{selectedDevice.voltage} V</h2>
                    <small>Main Battery</small>
                </div>
                <div className="progress-container">
                    <div className="progress-label"><span>Charge Level</span><span>{selectedDevice.voltage > 0 ? '85%' : '0%'}</span></div>
                    <div className="progress-bar-bg"><div className="progress-fill" style={{ width: selectedDevice.voltage > 0 ? '85%' : '0%', background: '#10b981' }}></div></div>
                </div>
            </div>

            {/* Signal Widget */}
            <div className="widget-card">
                <div className="widget-title">Connectivity</div>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <i className="fa-solid fa-signal fa-3x" style={{ color: getSignalColor(selectedDevice.signal) }}></i>
                    <h2 style={{ margin: '10px 0 0' }}>{selectedDevice.signal} dBm</h2>
                    <small>{selectedDevice.ip}</small>
                </div>
                <div className="progress-container">
                    <div className="progress-label"><span>Signal Quality</span><span>Good</span></div>
                    <div className="progress-bar-bg"><div className="progress-fill" style={{ width: '75%', background: getSignalColor(selectedDevice.signal) }}></div></div>
                </div>
            </div>

            {/* Actions Widget */}
            <div className="widget-card">
                <div className="widget-title">Quick Actions</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button className="btn btn-primary" onClick={() => addLog('CMD: UNLOCK sent', 'TX')}>
                        <i className="fa-solid fa-unlock"></i> Unlock
                    </button>
                    <button className="btn btn-outline" style={{borderColor:'var(--danger)', color:'var(--danger)'}} onClick={() => addLog('CMD: LOCK sent', 'TX')}>
                        <i className="fa-solid fa-lock"></i> Lock
                    </button>
                    <button className="btn btn-outline" onClick={() => addLog('CMD: REBOOT sent', 'TX')}>
                        <i className="fa-solid fa-power-off"></i> Reboot
                    </button>
                    <button className="btn btn-outline" onClick={() => addLog('CMD: PING sent', 'TX')}>
                        <i className="fa-solid fa-wifi"></i> Ping
                    </button>
                </div>
            </div>
        </div>
    );

    // 2. CONSOLE TAB
    const renderConsole = () => (
        <div className="fade-in">
            <div className="terminal-window">
                <div style={{ borderBottom: '1px solid #334155', paddingBottom: '10px', marginBottom: '10px', display:'flex', justifyContent:'space-between' }}>
                    <span><i className="fa-solid fa-terminal"></i> root@device:~# tail -f /var/log/syslog</span>
                    <span style={{ fontSize: '0.8rem', cursor:'pointer' }} onClick={() => setLogs([])}>CLEAR</span>
                </div>
                {logs.map((log, idx) => (
                    <div key={idx} style={{ marginBottom: '4px', fontFamily: 'monospace' }}>
                        <span style={{ color: '#94a3b8', marginRight: '10px' }}>[{log.time}]</span>
                        {log.type === 'TX' && <span style={{ color: '#4ade80' }}>➜ TX:</span>}
                        {log.type === 'RX' && <span style={{ color: '#f472b6' }}>➜ RX:</span>}
                        {log.type === 'SYS' && <span style={{ color: '#fbbf24' }}>➜ SYS:</span>}
                        <span style={{ marginLeft: '8px' }}>{log.msg}</span>
                    </div>
                ))}
                <div ref={bottomRef}></div>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Enter custom command..." className="config-input" style={{ fontFamily: 'monospace' }} />
                <button className="btn btn-primary">Send</button>
            </div>
        </div>
    );

    // 3. CONFIG TAB
    const renderConfig = () => (
        <div className="fade-in widget-card" style={{ maxWidth: '600px' }}>
            <div className="widget-title"><i className="fa-solid fa-sliders"></i> Remote Configuration</div>
            <form onSubmit={handleSaveConfig}>
                <div className="config-group">
                    <label>Game Price (KES)</label>
                    <input 
                        type="number" 
                        className="config-input" 
                        value={configForm.pricePerGame || ''} 
                        onChange={(e) => setConfigForm({...configForm, pricePerGame: e.target.value})}
                    />
                </div>
                <div className="config-group">
                    <label>Sleep Timer (Minutes)</label>
                    <input 
                        type="number" 
                        className="config-input" 
                        value={configForm.sleepTimer || ''} 
                        onChange={(e) => setConfigForm({...configForm, sleepTimer: e.target.value})}
                    />
                </div>
                <div className="config-group">
                    <label>Audio Volume (%)</label>
                    <input 
                        type="range" 
                        min="0" max="100" 
                        style={{ width: '100%' }}
                        value={configForm.volume || 50} 
                        onChange={(e) => setConfigForm({...configForm, volume: e.target.value})}
                    />
                    <div style={{ textAlign: 'right', fontSize: '0.8rem' }}>{configForm.volume}%</div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    {isSaving ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-save"></i>} Save Changes
                </button>
            </form>
        </div>
    );

    // 4. MAP TAB
    const renderMap = () => (
        <div className="fade-in widget-card">
            <div className="widget-title"><i className="fa-solid fa-location-dot"></i> Last Known Location</div>
            <div className="map-view">
                <div>
                    <i className="fa-solid fa-map-location-dot fa-2x"></i>
                    <p>Interactive Map Component Placeholder</p>
                    <small>Lat: -1.2921, Long: 36.8219</small>
                </div>
            </div>
        </div>
    );

    return (
        <div className="control-layout fade-in">
            
            {/* --- LEFT PANEL: DEVICE LIST --- */}
            <div className="device-list-panel">
                <div className="device-search">
                    <input 
                        type="text" 
                        placeholder="Search devices..." 
                        className="form-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="device-list">
                    {MOCK_DEVICES.filter(d => d.id.includes(searchTerm)).map(device => (
                        <div 
                            key={device.id} 
                            className={`device-item ${selectedDevice?.id === device.id ? 'active' : ''}`}
                            onClick={() => setSelectedDevice(device)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 700 }}>{device.id}</span>
                                <span className={`status-dot ${device.status === 'Offline' ? 'offline' : 'online'}`}></span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>{device.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- RIGHT PANEL: COCKPIT --- */}
            <div className="cockpit-panel">
                {selectedDevice ? (
                    <>
                        {/* HEADER */}
                        <div className="cockpit-header">
                            <div className="header-title">
                                <h2>{selectedDevice.id}</h2>
                                <div className="header-meta">
                                    <i className="fa-solid fa-microchip"></i> {selectedDevice.mac} &nbsp;|&nbsp; 
                                    <i className="fa-solid fa-code-branch"></i> {selectedDevice.firmware}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span className={`header-status`} style={{ 
                                    background: selectedDevice.status === 'Offline' ? '#fee2e2' : '#dcfce7',
                                    color: selectedDevice.status === 'Offline' ? '#991b1b' : '#166534'
                                }}>
                                    {selectedDevice.status}
                                </span>
                                <div className="header-meta" style={{ marginTop: '5px' }}>Uptime: {selectedDevice.uptime}</div>
                            </div>
                        </div>

                        {/* TABS */}
                        <div className="cockpit-tabs">
                            <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
                            <button className={`tab-btn ${activeTab === 'console' ? 'active' : ''}`} onClick={() => setActiveTab('console')}>Terminal</button>
                            <button className={`tab-btn ${activeTab === 'config' ? 'active' : ''}`} onClick={() => setActiveTab('config')}>Configuration</button>
                            <button className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}>Location</button>
                        </div>

                        {/* CONTENT */}
                        <div className="cockpit-content">
                            {activeTab === 'overview' && renderOverview()}
                            {activeTab === 'console' && renderConsole()}
                            {activeTab === 'config' && renderConfig()}
                            {activeTab === 'map' && renderMap()}
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>
                        <div style={{ textAlign: 'center' }}>
                            <i className="fa-solid fa-server fa-3x" style={{ marginBottom: '20px' }}></i>
                            <h3>Select a device from the list</h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ControlCenter;
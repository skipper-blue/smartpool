import React, { useState } from 'react';
import '../assets/css/Owners.css';
import '../assets/css/Tables.css';
//import '../../assets/css/Modal.css'; // Assuming you have your standard modal CSS

const TablesPage = ({ onManageClick }) => {
    
    // 1. STATE FOR POPUP
    const [selectedTable, setSelectedTable] = useState(null);

    // Mock Data
    const [tablesData] = useState([
        { id: 'T-101', owner: 'John Doe', status: 'Online', battery: 98, incomeToday: 1200, lastPing: '1 min ago', sessions: 14 },
        { id: 'T-102', owner: 'John Doe', status: 'Busy', battery: 85, incomeToday: 800, lastPing: 'Just now', sessions: 8 },
        { id: 'T-205', owner: 'Jane Smith', status: 'Offline', battery: 0, incomeToday: 0, lastPing: '2 days ago', sessions: 0 },
    ]);

    const getBatteryColor = (level) => {
        if (level === 0) return '#cbd5e1'; 
        if (level < 20) return '#ef4444'; 
        if (level < 50) return '#f59e0b'; 
        return '#10b981'; 
    };

    // 2. HANDLER: Open the "Quick Overview" Modal
    const handleQuickView = (table) => {
        setSelectedTable(table);
    };

    // 3. HANDLER: Proceed to Full Control Center
    const proceedToControl = () => {
        if (selectedTable) {
            onManageClick(selectedTable.id); // This triggers the page navigation
        }
    };

    return (
        <div className="scroll-area fade-in">
            {/* Top Stats */}
            <div className="grid-3">
                <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
                    <div className="stat-label">Total Daily Income</div>
                    <div className="stat-val">KES {tablesData.reduce((acc, curr) => acc + curr.incomeToday, 0).toLocaleString()}</div>
                </div>
                <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                    <div className="stat-label">Active Sessions</div>
                    <div className="stat-val">{tablesData.filter(t => t.status === 'Busy').length}</div>
                </div>
                <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
                    <div className="stat-label">Offline</div>
                    <div className="stat-val">{tablesData.filter(t => t.status === 'Offline').length}</div>
                </div>
            </div>

            <div className="section-header" style={{ marginBottom: '15px' }}>
                <h3>Live Device Inventory</h3>
            </div>

            <div className="table-wrapper">
                <div className="responsive-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Device ID</th>
                                <th>Owner</th>
                                <th>Battery</th>
                                <th>Today's Inc.</th>
                                <th>Control</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tablesData.map((table) => (
                                <tr key={table.id}>
                                    <td>
                                        <span className={`status-dot ${
                                            table.status === 'Offline' ? 'offline' : 
                                            table.status === 'Busy' ? 'busy' : 'online'
                                        }`}></span>
                                        {table.status}
                                    </td>
                                    <td><b>{table.id}</b></td>
                                    <td>{table.owner}</td>
                                    <td>
                                        <div className="battery-badge">
                                            <i className="fa-solid fa-battery-half" style={{ color: getBatteryColor(table.battery) }}></i>
                                            {table.battery > 0 ? `${table.battery}%` : 'N/A'}
                                        </div>
                                    </td>
                                    <td style={{ color: '#166534', fontWeight: 'bold' }}>
                                        KES {table.incomeToday}
                                    </td>
                                    <td>
                                        {/* BUTTON NOW OPENS POPUP ONLY */}
                                        <button 
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleQuickView(table)}
                                        >
                                            <i className="fa-solid fa-eye"></i> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 4. THE OVERVIEW MODAL */}
            {selectedTable && (
                <div className="modal-overlay" onClick={() => setSelectedTable(null)}>
                    <div className="modal-content fade-in-up" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        
                        <div className="modal-header">
                            <h3>Overview: {selectedTable.id}</h3>
                            <button className="close-btn" onClick={() => setSelectedTable(null)}>&times;</button>
                        </div>

                        <div style={{ padding: '10px 0' }}>
                            {/* Performance Card inside Modal */}
                            <div style={{ 
                                background: '#f8fafc', 
                                border: '1px solid #e2e8f0', 
                                borderRadius: '8px', 
                                padding: '20px',
                                textAlign: 'center',
                                marginBottom: '20px'
                            }}>
                                <div style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>
                                    Current Performance
                                </div>
                                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#166534' }}>
                                    KES {selectedTable.incomeToday}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '15px' }}>
                                    <span><i className="fa-solid fa-gamepad"></i> {selectedTable.sessions} Games</span>
                                    <span><i className="fa-solid fa-clock"></i> {selectedTable.lastPing}</span>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                                <div style={{ padding: '10px', border: '1px solid #eee', borderRadius: '6px' }}>
                                    <strong>Status</strong>
                                    <div style={{ marginTop: '5px' }}>
                                        <span className={`status-dot ${selectedTable.status === 'Offline' ? 'offline' : 'online'}`}></span> 
                                        {selectedTable.status}
                                    </div>
                                </div>
                                <div style={{ padding: '10px', border: '1px solid #eee', borderRadius: '6px' }}>
                                    <strong>Battery</strong>
                                    <div style={{ marginTop: '5px', color: getBatteryColor(selectedTable.battery) }}>
                                        <i className="fa-solid fa-battery-half"></i> {selectedTable.battery}%
                                    </div>
                                </div>
                            </div>

                            <div style={{ background: '#fffbeb', padding: '10px', fontSize: '0.85rem', color: '#92400e', borderRadius: '6px', marginBottom: '20px' }}>
                                <i className="fa-solid fa-triangle-exclamation"></i> 
                                Need to reboot, change prices, or lock this table? 
                                Access the Control Center below.
                            </div>

                            <div className="modal-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                                <button className="btn btn-outline" onClick={() => setSelectedTable(null)}>
                                    Close
                                </button>
                                {/* THE REDIRECT BUTTON */}
                                <button className="btn btn-primary" onClick={proceedToControl}>
                                    <i className="fa-solid fa-sliders"></i> Enter Control Center
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TablesPage;
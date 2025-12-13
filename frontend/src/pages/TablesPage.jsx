import React, { useState } from 'react';
import '../assets/css/Owners.css'; // Reusing the toolbar/stats styles
import '../assets/css/Tables.css';
//import '../../assets/css/Modal.css';

const TablesPage = ({ onManageClick }) => {
    
    // STATE
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTable, setSelectedTable] = useState(null); // For Modal

    // MOCK DATA
    const [tablesData] = useState([
        { id: 'T-101', location: 'Nairobi West - Bar A', owner: 'John Doe', status: 'Online', battery: 98, incomeToday: 1200, lastPing: '1 min ago', sessions: 14, signal: -45 },
        { id: 'T-102', location: 'Nairobi West - Bar A', owner: 'John Doe', status: 'Busy', battery: 65, incomeToday: 800, lastPing: 'Just now', sessions: 8, signal: -60 },
        { id: 'T-205', location: 'Kasarani - Club Z', owner: 'Jane Smith', status: 'Offline', battery: 0, incomeToday: 0, lastPing: '2 days ago', sessions: 0, signal: 0 },
        { id: 'T-305', location: 'CBD - Retro Lounge', owner: 'City Pub Ltd', status: 'Online', battery: 15, incomeToday: 2500, lastPing: '5 mins ago', sessions: 22, signal: -78 },
        { id: 'T-401', location: 'Westlands - Sky Bar', owner: 'Mike K', status: 'Online', battery: 100, incomeToday: 400, lastPing: '30 sec ago', sessions: 4, signal: -40 },
    ]);

    // --- HELPERS ---
    const getBatteryColor = (level) => {
        if (level === 0) return '#cbd5e1'; 
        if (level < 20) return '#ef4444'; // Red
        if (level < 50) return '#f59e0b'; // Orange
        return '#10b981'; // Green
    };

    const filteredTables = tablesData.filter(t => 
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- RENDER CARD (Grid View) ---
    const renderCard = (table) => (
        <div className="device-card fade-in-up" key={table.id}>
            {/* Header */}
            <div className="dev-card-header">
                <div className="dev-icon">
                    <i className="fa-solid fa-microchip"></i>
                </div>
                <div className={`dev-badge ${table.status.toLowerCase()}`}>
                    {table.status}
                </div>
            </div>

            {/* Title & Info */}
            <div>
                <h3 style={{margin:0, fontSize:'1.1rem'}}>{table.id}</h3>
                <p style={{color:'#64748b', fontSize:'0.85rem', margin:'5px 0'}}>{table.location}</p>
            </div>

            {/* Visual Metrics */}
            <div className="dev-metrics">
                <div className="metric-item">
                    <label>Battery ({table.battery}%)</label>
                    <div className="battery-visual">
                        <div 
                            className="battery-fill" 
                            style={{width: `${table.battery}%`, background: getBatteryColor(table.battery)}}
                        ></div>
                    </div>
                </div>
                <div className="metric-item" style={{textAlign:'right'}}>
                    <label>Income Today</label>
                    <span style={{color: '#166534'}}>KES {table.incomeToday}</span>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="dev-card-footer">
                <button className="btn btn-sm btn-outline" onClick={() => setSelectedTable(table)}>
                    <i className="fa-solid fa-eye"></i> Quick View
                </button>
                <button className="btn btn-sm btn-primary" onClick={() => onManageClick(table.id)}>
                    <i className="fa-solid fa-gamepad"></i> Manage
                </button>
            </div>
        </div>
    );

    // --- RENDER TABLE (List View) ---
    const renderList = () => (
        <div className="table-wrapper fade-in">
            <table className="responsive-table">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Device ID</th>
                        <th>Location</th>
                        <th>Battery</th>
                        <th>Income</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTables.map(table => (
                        <tr key={table.id}>
                            <td><span className={`status-dot ${table.status.toLowerCase()}`}></span> {table.status}</td>
                            <td><b>{table.id}</b></td>
                            <td>{table.location}</td>
                            <td>
                                <span style={{color: getBatteryColor(table.battery), fontWeight:600}}>
                                    {table.battery}%
                                </span>
                            </td>
                            <td style={{color:'#166534', fontWeight:'bold'}}>KES {table.incomeToday}</td>
                            <td>
                                <button className="btn btn-sm btn-primary" onClick={() => onManageClick(table.id)}>
                                    Manage
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="fade-in">
            
            {/* 1. HEADER STATS (High Level) */}
            <div className="owners-header-stats">
                <div className="stat-card-fancy">
                    <div className="stat-icon-box" style={{background:'#dbeafe', color:'#1e40af'}}>
                        <i className="fa-solid fa-layer-group"></i>
                    </div>
                    <div>
                        <div style={{color:'#64748b', fontSize:'0.85rem'}}>Total Devices</div>
                        <div style={{fontSize:'1.5rem', fontWeight:'800'}}>{tablesData.length}</div>
                    </div>
                </div>
                <div className="stat-card-fancy">
                    <div className="stat-icon-box" style={{background:'#dcfce7', color:'#166534'}}>
                        <i className="fa-solid fa-coins"></i>
                    </div>
                    <div>
                        <div style={{color:'#64748b', fontSize:'0.85rem'}}>Today's Revenue</div>
                        <div style={{fontSize:'1.5rem', fontWeight:'800'}}>
                            KES {tablesData.reduce((acc, curr) => acc + curr.incomeToday, 0).toLocaleString()}
                        </div>
                    </div>
                </div>
                <div className="stat-card-fancy">
                    <div className="stat-icon-box" style={{background:'#fef3c7', color:'#b45309'}}>
                        <i className="fa-solid fa-bolt"></i>
                    </div>
                    <div>
                        <div style={{color:'#64748b', fontSize:'0.85rem'}}>Low Battery</div>
                        <div style={{fontSize:'1.5rem', fontWeight:'800'}}>
                            {tablesData.filter(t => t.battery < 20 && t.battery > 0).length}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. TOOLBAR (Search & Toggle) */}
            <div className="toolbar-fancy">
                <div style={{display:'flex', gap:'15px', alignItems:'center'}}>
                    <div style={{position:'relative'}}>
                        <i className="fa-solid fa-search" style={{position:'absolute', left:'12px', top:'12px', color:'#94a3b8'}}></i>
                        <input 
                            type="text" 
                            className="search-fancy" 
                            placeholder="Search by ID or Location..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{paddingLeft:'35px'}}
                        />
                    </div>
                </div>
                
                <div style={{display:'flex', gap:'10px'}}>
                    <button 
                        className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setViewMode('grid')}
                    >
                        <i className="fa-solid fa-border-all"></i> Grid
                    </button>
                    <button 
                        className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setViewMode('list')}
                    >
                        <i className="fa-solid fa-list"></i> List
                    </button>
                </div>
            </div>

            {/* 3. CONTENT AREA */}
            {viewMode === 'grid' ? (
                <div className="device-grid">
                    {filteredTables.map(renderCard)}
                </div>
            ) : renderList()}

            {/* 4. MODAL (Quick Overview) */}
            {selectedTable && (
                <div className="modal-overlay" onClick={() => setSelectedTable(null)}>
                    <div className="modal-content fade-in-up" onClick={(e) => e.stopPropagation()} style={{maxWidth: '450px'}}>
                        <div className="modal-header">
                            <h3><i className="fa-solid fa-microchip"></i> &nbsp; {selectedTable.id}</h3>
                            <button className="close-btn" onClick={() => setSelectedTable(null)}>&times;</button>
                        </div>
                        <div style={{padding:'20px 0'}}>
                            <div style={{textAlign:'center', marginBottom:'20px'}}>
                                <div style={{fontSize:'2.5rem', fontWeight:'800', color: selectedTable.status === 'Offline' ? '#94a3b8' : '#10b981'}}>
                                    {selectedTable.status}
                                </div>
                                <div style={{color:'#64748b'}}>{selectedTable.location}</div>
                            </div>
                            
                            <div className="grid-2" style={{gap:'15px', marginBottom:'20px'}}>
                                <div style={{background:'#f8fafc', padding:'15px', borderRadius:'8px', border:'1px solid #e2e8f0'}}>
                                    <small>Battery Level</small>
                                    <div style={{fontWeight:'700', fontSize:'1.2rem', color: getBatteryColor(selectedTable.battery)}}>
                                        {selectedTable.battery}%
                                    </div>
                                </div>
                                <div style={{background:'#f8fafc', padding:'15px', borderRadius:'8px', border:'1px solid #e2e8f0'}}>
                                    <small>Games Played</small>
                                    <div style={{fontWeight:'700', fontSize:'1.2rem'}}>
                                        {selectedTable.sessions}
                                    </div>
                                </div>
                            </div>

                            <button className="btn btn-primary" style={{width:'100%'}} onClick={() => onManageClick(selectedTable.id)}>
                                Open Control Center
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TablesPage;
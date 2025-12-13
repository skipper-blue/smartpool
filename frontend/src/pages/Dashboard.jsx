import React from 'react';
import ActivityTable from '../components/ActivityTable'; // Ensure this path is correct for your project
import './css/Dashboard.css'; 

function Dashboard() {
    
    // MOCK DATA 
    const data = {
        todayRevenue: 145200,
        yesterdayRevenue: 128000,
        activeTables: 18,
        totalTables: 24,
        pendingPayouts: 3,
        locations: [
            { name: 'Nairobi West', amount: 45000, percent: 85 },
            { name: 'Kasarani Hub', amount: 32000, percent: 60 },
            { name: 'CBD Branch', amount: 28500, percent: 45 },
        ]
    };

    // Calculate percent growth
    const growth = ((data.todayRevenue - data.yesterdayRevenue) / data.yesterdayRevenue) * 100;

    return (
        <div className="scroll-area">
            
            {/* 1. HEADER SECTION */}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'25px'}}>
                <div>
                    <h1 style={{fontSize:'1.8rem', fontWeight:'800', color:'#0f172a', margin:0}}>Dashboard</h1>
                    <p style={{color:'#64748b', margin:'5px 0 0'}}>Overview for {new Date().toLocaleDateString('en-GB', { dateStyle: 'full' })}</p>
                </div>
                <div style={{display:'flex', gap:'10px'}}>
                    <button className="btn btn-primary" style={{boxShadow:'0 4px 14px 0 rgba(0,118,255,0.39)'}}>
                        <i className="fa-solid fa-plus"></i> &nbsp;New Entry
                    </button>
                </div>
            </div>

            {/* 2. STATS GRID */}
            <div className="dashboard-grid">
                
                {/* CARD 1: TOTAL REVENUE (Gradient Style) */}
                <div className="hd-card gradient-primary">
                    <div className="card-top">
                        <div className="card-icon-box">
                            <i className="fa-solid fa-chart-line"></i>
                        </div>
                        <div className="trend-badge" style={{background:'rgba(255,255,255,0.2)', color:'white'}}>
                            <i className="fa-solid fa-arrow-up"></i> {growth.toFixed(1)}%
                        </div>
                    </div>
                    <div>
                        <div className="stat-label">Total Revenue</div>
                        <div className="stat-value">KES {data.todayRevenue.toLocaleString()}</div>
                        <div className="stat-sub">
                            + KES {(data.todayRevenue - data.yesterdayRevenue).toLocaleString()} since yesterday
                        </div>
                    </div>
                </div>

                {/* CARD 2: ACTIVE TABLES (Live Pulse) */}
                <div className="hd-card">
                    <div className="card-top">
                        <div className="card-icon-box" style={{background:'#ecfdf5', color:'#059669'}}>
                            <i className="fa-solid fa-wifi"></i>
                        </div>
                        <div className="live-indicator">
                            <div className="pulse-dot"></div> Live
                        </div>
                    </div>
                    <div>
                        <div className="stat-label">Active Tables</div>
                        <div className="stat-value">{data.activeTables} <span style={{fontSize:'1.2rem', color:'#cbd5e1', fontWeight:'400'}}>/ {data.totalTables}</span></div>
                        <div className="progress-track">
                            <div className="progress-fill" style={{width: `${(data.activeTables/data.totalTables)*100}%`}}></div>
                        </div>
                        <div className="stat-sub">75% Capacity utilization</div>
                    </div>
                </div>

                {/* CARD 3: PENDING PAYOUTS */}
                <div className="hd-card">
                    <div className="card-top">
                        <div className="card-icon-box" style={{background:'#fff7ed', color:'#ea580c'}}>
                            <i className="fa-solid fa-wallet"></i>
                        </div>
                        {data.pendingPayouts > 0 && (
                            <div className="trend-badge trend-down">Action Required</div>
                        )}
                    </div>
                    <div>
                        <div className="stat-label">Pending Requests</div>
                        <div className="stat-value">{data.pendingPayouts}</div>
                        <div className="stat-sub" style={{color:'#ea580c'}}>
                            <i className="fa-solid fa-circle-exclamation"></i> &nbsp; Needs approval
                        </div>
                    </div>
                </div>

                 {/* CARD 4: MOCK CHART PREVIEW */}
                 <div className="hd-card" style={{justifyContent:'center', alignItems:'center'}}>
                    <div style={{width:'100%', height:'80px', display:'flex', alignItems:'flex-end', gap:'5px', paddingBottom:'10px'}}>
                        {[40, 60, 35, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} style={{
                                width:'100%', 
                                height: `${h}%`, 
                                background: i === 5 ? '#3b82f6' : '#e2e8f0', 
                                borderRadius:'4px',
                                transition: 'height 1s ease'
                            }}></div>
                        ))}
                    </div>
                    <div className="stat-label" style={{alignSelf:'flex-start'}}>Weekly Volume</div>
                </div>

            </div>

            {/* 3. SPLIT SECTION: CHART & LIST */}
            <div className="dashboard-split">
                
                {/* Mock Main Chart Area */}
                <div className="hd-card">
                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}>
                        <h3 style={{margin:0, color:'#1e293b'}}>Revenue Analytics</h3>
                        <select style={{border:'1px solid #e2e8f0', borderRadius:'6px', padding:'4px 8px', color:'#64748b'}}>
                            <option>This Week</option>
                            <option>This Month</option>
                        </select>
                    </div>
                    <div style={{flex:1, background:'#f8fafc', borderRadius:'12px', border:'2px dashed #e2e8f0', display:'flex', alignItems:'center', justifyContent:'center', color:'#94a3b8'}}>
                        <div style={{textAlign:'center'}}>
                            <i className="fa-solid fa-chart-area" style={{fontSize:'3rem', marginBottom:'10px', opacity:0.3}}></i>
                            <p>Chart Component Loads Here</p>
                        </div>
                    </div>
                </div>

                {/* Top Locations List */}
                <div className="hd-card">
                    <h3 style={{margin:'0 0 20px 0', color:'#1e293b', fontSize:'1.1rem'}}>Top Locations</h3>
                    <div style={{display:'flex', flexDirection:'column', gap:'18px'}}>
                        {data.locations.map((loc, idx) => (
                            <div key={idx}>
                                <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.9rem', fontWeight:'600', marginBottom:'5px'}}>
                                    <span style={{color:'#334155'}}>{loc.name}</span>
                                    <span style={{color:'#1e293b'}}>KES {loc.amount/1000}k</span>
                                </div>
                                <div style={{width:'100%', height:'6px', background:'#f1f5f9', borderRadius:'10px'}}>
                                    <div style={{
                                        width: `${loc.percent}%`, 
                                        height:'100%', 
                                        background: idx === 0 ? '#10b981' : '#cbd5e1', // Green for #1, gray for others
                                        borderRadius:'10px'
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-outline" style={{marginTop:'auto', width:'100%', border:'1px solid #e2e8f0'}}>
                        View All Reports
                    </button>
                </div>
            </div>

            {/* 4. ACTIVITY TABLE */}
            <div>
                <h3 style={{fontSize:'1.2rem', marginBottom:'15px', color:'#1e293b'}}>Recent Activity</h3>
                <div className="hd-card" style={{padding:0, overflow:'hidden', border:'none'}}>
                    <ActivityTable transactions={[]} /> 
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
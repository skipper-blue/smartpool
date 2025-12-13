import React from 'react';
import ActivityTable from '../components/ActivityTable'; // Assuming you have this
import './css/Dashboard.css'; 

function Dashboard() {
    
    // MOCK DATA (In a real app, these come from your API)
    // We use 'null' to represent loading, but here I've filled them for the 'Advanced' look.
    const stats = {
        revenue: 145000,
        activeTables: 18,
        pendingPayouts: 3,
        issues: 1
    };
    
    // Helper to format currency
    const formatCurrency = (val) => val ? `KES ${val.toLocaleString()}` : '...';

    return (
        <div className="scroll-area fade-in">
            
            {/* 1. WELCOME HEADER */}
            <div className="section-header">
                <div className="welcome-text">
                    <h1>Dashboard Overview</h1>
                    <p>{new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div>
                    <button className="btn btn-primary" style={{padding:'10px 20px', display:'flex', alignItems:'center', gap:'10px'}}>
                        <i className="fa-solid fa-download"></i> Generate Report
                    </button>
                </div>
            </div>

            {/* 2. ADVANCED STATS GRID */}
            <div className="dashboard-grid">
                
                {/* Card 1: Revenue */}
                <div className="hd-card">
                    <div className="card-top">
                        <div className="card-icon-box" style={{background:'#dcfce7', color:'#166534'}}>
                            <i className="fa-solid fa-coins"></i>
                        </div>
                        <span className="trend-up"><i className="fa-solid fa-arrow-trend-up"></i> +12.5%</span>
                    </div>
                    <div>
                        <div className="stat-label">Total Revenue Today</div>
                        <div className="stat-value">{formatCurrency(stats.revenue)}</div>
                        <div className="stat-sub" style={{color:'#64748b'}}>
                            vs. KES 128k yesterday
                        </div>
                    </div>
                </div>

                {/* Card 2: Active Tables */}
                <div className="hd-card">
                    <div className="card-top">
                        <div className="card-icon-box" style={{background:'#dbeafe', color:'#1e40af'}}>
                            <i className="fa-solid fa-gamepad"></i>
                        </div>
                        <span className="trend-up" style={{color:'#1e40af', background:'#eff6ff'}}>Live</span>
                    </div>
                    <div>
                        <div className="stat-label">Active Tables</div>
                        <div className="stat-value">{stats.activeTables || '-'} <span style={{fontSize:'1rem', color:'#94a3b8'}}>/ 24</span></div>
                        
                        {/* Visual Progress Bar */}
                        <div className="visual-bar-container">
                            <div className="visual-bar-fill" style={{width: '75%', background:'#3b82f6'}}></div>
                        </div>
                        <div className="stat-sub">75% Utilization</div>
                    </div>
                </div>

                {/* Card 3: Pending Payouts */}
                <div className="hd-card">
                    <div className="card-top">
                        <div className="card-icon-box" style={{background:'#fff7ed', color:'#c2410c'}}>
                            <i className="fa-solid fa-wallet"></i>
                        </div>
                        {stats.pendingPayouts > 0 && (
                            <span className="trend-down" style={{background:'#fff7ed', color:'#c2410c'}}>Action Needed</span>
                        )}
                    </div>
                    <div>
                        <div className="stat-label">Pending Payouts</div>
                        <div className="stat-value">{stats.pendingPayouts || 0}</div>
                        <div className="stat-sub">
                            Requests waiting for approval
                        </div>
                    </div>
                </div>

                {/* Card 4: System Health */}
                <div className="hd-card">
                    <div className="card-top">
                        <div className="card-icon-box" style={{background:'#f3f4f6', color:'#475569'}}>
                            <i className="fa-solid fa-server"></i>
                        </div>
                        <span style={{fontSize:'0.8rem', fontWeight:'600', color: stats.issues > 0 ? '#ef4444' : '#10b981'}}>
                            {stats.issues > 0 ? '1 Alert' : 'Healthy'}
                        </span>
                    </div>
                    <div>
                        <div className="stat-label">System Health</div>
                        <div className="stat-value" style={{fontSize:'1.4rem'}}>98.2%</div>
                        <div className="stat-sub">
                            <span style={{width:'8px', height:'8px', borderRadius:'50%', background: stats.issues > 0 ? '#ef4444':'#10b981', display:'inline-block'}}></span>
                            {stats.issues > 0 ? 'Connectivity Issue detected' : 'All systems operational'}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. SPLIT SECTION (Chart Placeholder & Details) */}
            <div className="dashboard-split">
                <div className="hd-card" style={{minHeight:'300px', justifyContent:'center', alignItems:'center', background:'#f8fafc', borderStyle:'dashed'}}>
                    {/* Placeholder for a Chart Library like Recharts */}
                    <div style={{textAlign:'center', color:'#94a3b8'}}>
                        <i className="fa-solid fa-chart-line" style={{fontSize:'3rem', marginBottom:'15px', opacity:0.5}}></i>
                        <p>Revenue Analytics Graph would go here</p>
                    </div>
                </div>

                <div className="hd-card">
                    <h3 style={{margin:'0 0 20px 0', fontSize:'1.1rem'}}>Top Locations</h3>
                    <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                        {['Nairobi West', 'Kasarani', 'CBD Branch'].map((loc, index) => (
                            <div key={index} style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #f1f5f9', paddingBottom:'10px'}}>
                                <span style={{fontWeight:'600', color:'#475569'}}>{index + 1}. {loc}</span>
                                <span style={{fontWeight:'700', color:'#10b981'}}>KES {(45 - index*10)}k</span>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-sm btn-outline" style={{marginTop:'auto', width:'100%'}}>View All Locations</button>
                </div>
            </div>

            {/* 4. ACTIVITY TABLE SECTION */}
            <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px'}}>
                    <h3 style={{margin:0, fontSize:'1.2rem'}}>Recent Transactions</h3>
                    <a href="#" style={{color:'var(--primary)', fontSize:'0.9rem', textDecoration:'none', fontWeight:'600'}}>View All</a>
                </div>
                {/* If you have the ActivityTable component, it renders here. 
                    If mock data is empty, ensure the table handles empty states gracefully */}
                <div className="hd-card" style={{padding:0, overflow:'hidden'}}>
                    <ActivityTable transactions={[]} /> 
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
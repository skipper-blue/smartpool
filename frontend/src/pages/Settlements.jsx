import React, { useState, useEffect } from 'react';
import '../assets/css/Settlements.css';
//import '../components/css/ActivityTable.css'; 
import { mockData } from '../data/mockData'; 

const Settlements = () => {
    
    // --- STATE CONFIG ---
    const [activeTab, setActiveTab] = useState('pending'); 
    const [selectedOwners, setSelectedOwners] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    // Payment Processing States
    const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success
    const [transactionRef, setTransactionRef] = useState('');

    // --- DYNAMIC DATA GENERATOR (To keep it "Up to Date") ---
    const today = new Date();
    const formatDate = (date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    // Mock Data - now from common data file
    const [pendingPayouts, setPendingPayouts] = useState(mockData.pendingPayouts);

    // --- CALCULATIONS ---
    const totalUnpaid = pendingPayouts.reduce((acc, curr) => acc + curr.payable, 0);
    const selectionSum = pendingPayouts
        .filter(p => selectedOwners.includes(p.id))
        .reduce((acc, curr) => acc + curr.payable, 0);

    // --- HANDLERS ---
    const handleSelectAll = () => {
        if (selectedOwners.length === pendingPayouts.length) setSelectedOwners([]);
        else setSelectedOwners(pendingPayouts.map(p => p.id));
    };

    const toggleSelect = (id) => {
        selectedOwners.includes(id) 
            ? setSelectedOwners(prev => prev.filter(i => i !== id)) 
            : setSelectedOwners(prev => [...prev, id]);
    };

    const initiatePayment = () => {
        setPaymentStatus('processing');
        
        // SIMULATE DARAJA API INTERACTION
        setTimeout(() => {
            setPaymentStatus('success');
            setTransactionRef(`TX-${Math.floor(Math.random() * 1000000)}`); // Random Receipt #
            
            // Remove paid items from list after visual delay
            const remaining = pendingPayouts.filter(p => !selectedOwners.includes(p.id));
            setPendingPayouts(remaining);
        }, 2000);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setPaymentStatus('idle'); // Reset for next time
        setSelectedOwners([]);
    };

    return (
        <div className="scroll-area fade-in">
            
            {/* 1. HEADER */}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'30px'}}>
                <div>
                    <h1 style={{fontSize:'2rem', fontWeight:'800', color:'#0f172a', margin:0, letterSpacing:'-1px'}}>Settlements</h1>
                    <div style={{display:'flex', gap:'10px', marginTop:'8px', fontSize:'0.9rem', color:'#64748b'}}>
                        <span><i className="fa-regular fa-calendar"></i> {formatDate(today)}</span>
                        <span>•</span>
                        <span style={{color:'#10b981', fontWeight:'600'}}>System Operational</span>
                    </div>
                </div>
                <div>
                    <button className="btn btn-outline" style={{background:'white'}}>
                        <i className="fa-solid fa-file-export"></i> Export Report
                    </button>
                </div>
            </div>

            {/* 2. HIGH-END STATS GRID */}
            <div className="settlements-grid">
                
                {/* A. UNPAID BALANCE (Dark Theme) */}
                <div className="money-card card-dark">
                    <div>
                        <div className="stat-label">Outstanding Payouts</div>
                        <div className="stat-val">KES {totalUnpaid.toLocaleString()}</div>
                    </div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto'}}>
                        <div style={{fontSize:'0.85rem', opacity:0.7}}>
                            {pendingPayouts.length} Vendors waiting
                        </div>
                        <div style={{width:'40px', height:'40px', background:'rgba(255,255,255,0.1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <i className="fa-solid fa-wallet"></i>
                        </div>
                    </div>
                </div>

                {/* B. LIQUIDITY (Green Theme) */}
                <div className="money-card card-green">
                    <div>
                        <div className="stat-label" style={{color:'#d1fae5'}}>Till Balance (Utility)</div>
                        <div className="stat-val">KES 850,400</div>
                    </div>
                    <div style={{marginTop:'auto', display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
                        <div className="live-badge">
                            <div className="blink-dot"></div> Daraja API Live
                        </div>
                        <i className="fa-solid fa-wifi" style={{opacity:0.6}}></i>
                    </div>
                </div>

                {/* C. ACTIONS (Light Theme) */}
                <div className="money-card card-light">
                    <div>
                        <div className="stat-label" style={{color:'#64748b'}}>Quick Actions</div>
                        <div style={{fontSize:'1.1rem', fontWeight:'600', color:'#0f172a'}}>
                            Next Batch: <span style={{color:'#3b82f6'}}>Today, 6:00 PM</span>
                        </div>
                    </div>
                    <button 
                        className="btn-glossy" 
                        style={{width:'100%', padding:'14px', borderRadius:'10px', border:'none', cursor:'pointer', marginTop:'auto'}}
                        onClick={() => { handleSelectAll(); setIsDrawerOpen(true); }}
                    >
                        Process All ({pendingPayouts.length}) <i className="fa-solid fa-arrow-right" style={{marginLeft:'5px'}}></i>
                    </button>
                </div>
            </div>

            {/* 3. LIST CONTENT */}
            <div className="table-card" style={{minHeight:'400px'}}>
                {/* Tabs */}
                <div style={{padding:'20px 24px', borderBottom:'1px solid #f1f5f9', display:'flex', gap:'20px'}}>
                    <button 
                        onClick={() => setActiveTab('pending')}
                        style={{
                            background:'none', border:'none', 
                            borderBottom: activeTab === 'pending' ? '2px solid #0f172a' : '2px solid transparent',
                            fontWeight: activeTab === 'pending' ? '700' : '500',
                            color: activeTab === 'pending' ? '#0f172a' : '#64748b',
                            paddingBottom:'8px', cursor:'pointer'
                        }}
                    >
                        Pending Settlements
                    </button>
                    <button 
                         onClick={() => setActiveTab('history')}
                         style={{
                             background:'none', border:'none', 
                             borderBottom: activeTab === 'history' ? '2px solid #0f172a' : '2px solid transparent',
                             fontWeight: activeTab === 'history' ? '700' : '500',
                             color: activeTab === 'history' ? '#0f172a' : '#64748b',
                             paddingBottom:'8px', cursor:'pointer'
                         }}
                    >
                        Transaction History
                    </button>
                </div>

                {/* Toolbar */}
                {activeTab === 'pending' && (
                    <div style={{padding:'15px 24px', background:'#f8fafc', borderBottom:'1px solid #e2e8f0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div style={{fontSize:'0.9rem', color:'#64748b'}}>
                            <i className="fa-solid fa-circle-info"></i> Select owners to disburse funds immediately.
                        </div>
                        {selectedOwners.length > 0 && (
                            <button 
                                className="btn-glossy" 
                                style={{padding:'8px 20px', borderRadius:'8px', fontSize:'0.9rem', cursor:'pointer'}}
                                onClick={() => setIsDrawerOpen(true)}
                            >
                                Pay {selectedOwners.length} Selected (KES {selectionSum.toLocaleString()})
                            </button>
                        )}
                    </div>
                )}

                {/* Table */}
                <div className="responsive-table">
                    <table className="hd-table">
                        <thead>
                            <tr>
                                <th style={{width:'50px'}}>
                                    <input type="checkbox" onChange={handleSelectAll} checked={selectedOwners.length === pendingPayouts.length && pendingPayouts.length > 0} />
                                </th>
                                <th>Beneficiary</th>
                                <th>Tables</th>
                                <th>Gross Revenue</th>
                                <th>Platform Fee</th>
                                <th>Net Payout</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingPayouts.length > 0 ? (
                                pendingPayouts.map(p => (
                                    <tr key={p.id} style={{background: selectedOwners.includes(p.id) ? '#eff6ff' : 'transparent'}}>
                                        <td>
                                            <input type="checkbox" checked={selectedOwners.includes(p.id)} onChange={() => toggleSelect(p.id)} />
                                        </td>
                                        <td>
                                            <div style={{fontWeight:'600', color:'#0f172a'}}>{p.owner}</div>
                                            <div style={{fontSize:'0.75rem', color:'#64748b'}}>ID: {p.id}</div>
                                        </td>
                                        <td>{p.tables}</td>
                                        <td>KES {p.revenue.toLocaleString()}</td>
                                        <td style={{color:'#ef4444'}}>- {p.fee.toLocaleString()}</td>
                                        <td style={{fontWeight:'700', color:'#15803d'}}>KES {p.payable.toLocaleString()}</td>
                                        <td><span className="status-badge status-pending">Pending</span></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{textAlign:'center', padding:'50px', color:'#94a3b8'}}>
                                        <i className="fa-solid fa-check-circle" style={{fontSize:'2rem', marginBottom:'15px', color:'#10b981'}}></i>
                                        <p>All settlements are up to date!</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 4. THE HIGH-END PAYMENT DRAWER */}
            {isDrawerOpen && (
                <div className="drawer-overlay">
                    <div className="drawer-panel">
                        
                        {/* VIEW 1: CONFIRMATION */}
                        {paymentStatus !== 'success' && (
                            <>
                                <div style={{padding:'24px', borderBottom:'1px solid #e2e8f0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                    <h2 style={{fontSize:'1.2rem', margin:0}}>Confirm Disbursement</h2>
                                    <button onClick={closeDrawer} style={{background:'none', border:'none', fontSize:'1.5rem', cursor:'pointer', color:'#64748b'}}>&times;</button>
                                </div>
                                
                                <div style={{flex:1, padding:'30px', overflowY:'auto'}}>
                                    <div style={{textAlign:'center', marginBottom:'30px'}}>
                                        <div style={{fontSize:'0.9rem', textTransform:'uppercase', color:'#64748b', fontWeight:'700'}}>Total Amount</div>
                                        <div style={{fontSize:'2.5rem', fontWeight:'800', color:'#0f172a'}}>KES {selectionSum.toLocaleString()}</div>
                                    </div>

                                    <div style={{background:'#f8fafc', borderRadius:'12px', padding:'20px'}}>
                                        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px', fontSize:'0.9rem', color:'#64748b'}}>
                                            <span>Recipients</span>
                                            <span>{selectedOwners.length} Vendors</span>
                                        </div>
                                        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px', fontSize:'0.9rem', color:'#64748b'}}>
                                            <span>Source</span>
                                            <span>M-Pesa B2C (Utility)</span>
                                        </div>
                                        <div style={{display:'flex', justifyContent:'space-between', fontWeight:'600', color:'#0f172a', paddingTop:'10px', borderTop:'1px dashed #cbd5e1'}}>
                                            <span>Net Total</span>
                                            <span>KES {selectionSum.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div style={{marginTop:'30px', display:'flex', gap:'10px', padding:'15px', background:'#fff1f2', borderRadius:'8px', color:'#be123c', fontSize:'0.85rem'}}>
                                        <i className="fa-solid fa-triangle-exclamation" style={{marginTop:'2px'}}></i>
                                        <span>Action is irreversible. Funds will be transferred immediately to the recipients' M-Pesa mobile wallets.</span>
                                    </div>
                                </div>

                                <div style={{padding:'24px', borderTop:'1px solid #e2e8f0'}}>
                                    <button 
                                        className="btn-glossy" 
                                        style={{width:'100%', padding:'16px', borderRadius:'12px', border:'none', fontSize:'1rem', cursor:'pointer', display:'flex', justifyContent:'center', alignItems:'center', gap:'10px'}}
                                        onClick={initiatePayment}
                                        disabled={paymentStatus === 'processing'}
                                    >
                                        {paymentStatus === 'processing' ? (
                                            <>
                                                <i className="fa-solid fa-circle-notch fa-spin"></i> Contacting Daraja API...
                                            </>
                                        ) : (
                                            <>Confirm & Pay <i className="fa-solid fa-fingerprint"></i></>
                                        )}
                                    </button>
                                </div>
                            </>
                        )}

                        {/* VIEW 2: SUCCESS RECEIPT */}
                        {paymentStatus === 'success' && (
                            <div className="success-view">
                                <div style={{marginTop:'20%'}}>
                                    <div className="success-icon-circle">
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <h2 style={{color:'#166534', margin:'0 0 10px 0'}}>Payment Successful!</h2>
                                    <p style={{color:'#64748b', margin:0}}>Funds have been disbursed to {selectedOwners.length} recipients.</p>
                                    
                                    <div style={{margin:'30px auto', background:'#f8fafc', padding:'20px', borderRadius:'12px', maxWidth:'300px', textAlign:'left'}}>
                                        <div style={{fontSize:'0.8rem', color:'#94a3b8', textTransform:'uppercase'}}>Transaction Ref</div>
                                        <div style={{fontFamily:'monospace', fontSize:'1.1rem', fontWeight:'600', color:'#334155', marginBottom:'15px'}}>{transactionRef}</div>
                                        
                                        <div style={{fontSize:'0.8rem', color:'#94a3b8', textTransform:'uppercase'}}>Amount Paid</div>
                                        <div style={{fontSize:'1.1rem', fontWeight:'600', color:'#0f172a'}}>KES {selectionSum.toLocaleString()}</div>
                                    </div>

                                    <button 
                                        className="btn btn-outline" 
                                        style={{padding:'12px 30px', borderRadius:'30px', cursor:'pointer', border:'1px solid #cbd5e1', background:'white', fontWeight:'600', color:'#475569'}}
                                        onClick={closeDrawer}
                                    >
                                        Close Receipt
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default Settlements;
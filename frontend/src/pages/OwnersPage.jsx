import React, { useState } from 'react';
import OwnerDetail from '../components/ownersDetails'; // Make sure the path is correct
import '../assets/css/Owners.css';

const OwnersPage = () => {
    // STATE
    const [viewMode, setViewMode] = useState('grid');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOwner, setSelectedOwner] = useState(null); // New state for navigation

    // MOCK DATA
    const [owners, setOwners] = useState([
        { id: 1, name: 'John Kamau', email: 'john.k@gmail.com', phone: '+254 712 345 678', tables: 5, revenue: 125000, status: 'Active', location: 'Westlands' },
        { id: 2, name: 'Sarah Ochieng', email: 'sarah.o@yahoo.com', phone: '+254 722 987 654', tables: 3, revenue: 89000, status: 'Active', location: 'Kasarani' },
        { id: 3, name: 'David Mwangi', email: 'd.mwangi@biz.co.ke', phone: '+254 733 111 222', tables: 1, revenue: 12000, status: 'Pending', location: 'CBD' },
        { id: 4, name: 'City Pub Ltd', email: 'admin@citypub.com', phone: '+254 700 000 000', tables: 12, revenue: 450000, status: 'Active', location: 'Langata' },
    ]);

    // FORM STATE
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '' });

    // FILTER LOGIC
    const filteredOwners = owners.filter(o => 
        o.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        o.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // HANDLERS
    const handleCreate = (e) => {
        e.preventDefault();
        const newOwner = {
            id: owners.length + 1,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            tables: 0,
            revenue: 0,
            status: 'Active'
        };
        setOwners([...owners, newOwner]);
        setIsDrawerOpen(false);
        setFormData({ name: '', email: '', phone: '', location: '' });
        alert("Owner created successfully!");
    };

    // --- CONDITIONAL RENDER: SHOW DETAIL VIEW IF SELECTED ---
    if (selectedOwner) {
        return (
            <OwnerDetail 
                owner={selectedOwner} 
                onBack={() => setSelectedOwner(null)} 
            />
        );
    }

    // --- DEFAULT RENDER: LIST VIEW ---
    return (
        <div className="fade-in">
            
            {/* 1. STATS HEADER */}
            <div className="owners-header-stats">
                <div className="stat-card-fancy">
                    <div className="stat-icon-box" style={{background: '#dcfce7', color: '#166534'}}>
                        <i className="fa-solid fa-users"></i>
                    </div>
                    <div>
                        <div style={{color:'#64748b', fontSize:'0.85rem'}}>Total Owners</div>
                        <div style={{fontSize:'1.5rem', fontWeight:'800'}}>{owners.length}</div>
                    </div>
                </div>
                <div className="stat-card-fancy">
                    <div className="stat-icon-box" style={{background: '#e0f2fe', color: '#075985'}}>
                        <i className="fa-solid fa-wallet"></i>
                    </div>
                    <div>
                        <div style={{color:'#64748b', fontSize:'0.85rem'}}>Total Disbursed</div>
                        <div style={{fontSize:'1.5rem', fontWeight:'800'}}>KES 1.2M</div>
                    </div>
                </div>
                <div className="stat-card-fancy">
                    <div className="stat-icon-box" style={{background: '#fee2e2', color: '#991b1b'}}>
                        <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div>
                        <div style={{color:'#64748b', fontSize:'0.85rem'}}>Pending Reviews</div>
                        <div style={{fontSize:'1.5rem', fontWeight:'800'}}>2</div>
                    </div>
                </div>
            </div>

            {/* 2. TOOLBAR */}
            <div className="toolbar-fancy">
                <div style={{display:'flex', gap:'15px', alignItems:'center', flexWrap: 'wrap'}}>
                    <div style={{position:'relative', flex: 1}}>
                        <i className="fa-solid fa-search" style={{position:'absolute', left:'12px', top:'12px', color:'#94a3b8'}}></i>
                        <input 
                            type="text" 
                            className="search-fancy" 
                            placeholder="Search owners..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{paddingLeft:'35px', width: '100%', minWidth: '200px'}}
                        />
                    </div>
                    <div className="filter-badge">Active ({filteredOwners.length})</div>
                </div>
                
                <div style={{display:'flex', gap:'10px', marginTop: '10px'}}>
                    <button className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setViewMode('grid')}>
                        <i className="fa-solid fa-border-all"></i>
                    </button>
                    <button className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setViewMode('list')}>
                        <i className="fa-solid fa-list"></i>
                    </button>
                    <button className="btn btn-primary" onClick={() => setIsDrawerOpen(true)}>
                        <i className="fa-solid fa-user-plus"></i> Add Owner
                    </button>
                </div>
            </div>

            {/* 3. CONTENT AREA */}
            {viewMode === 'grid' ? (
                <div className="owners-grid">
                    {filteredOwners.map(owner => (
                        <div className="owner-card fade-in-up" key={owner.id}>
                            <div className="card-header">
                                <div className="avatar-circle">{owner.name.charAt(0)}</div>
                                <div className="owner-info">
                                    <h3>{owner.name}</h3>
                                    <p>{owner.email}</p>
                                    <div style={{display:'flex', alignItems:'center', gap:'5px', marginTop:'5px'}}>
                                        <span className={`status-dot ${owner.status === 'Active' ? 'online' : 'busy'}`}></span> 
                                        <small style={{color: owner.status === 'Active' ? 'green' : 'orange'}}>{owner.status}</small>
                                    </div>
                                </div>
                            </div>
                            <div className="card-stats-row">
                                <div className="mini-stat">
                                    <label>Tables</label><span>{owner.tables}</span>
                                </div>
                                <div className="mini-stat" style={{borderLeft:'1px solid #f1f5f9'}}>
                                    <label>Revenue</label><span style={{color:'#166534'}}>KES {(owner.revenue/1000).toFixed(1)}k</span>
                                </div>
                            </div>
                            <div className="card-actions">
                                <div style={{fontSize:'0.85rem', color:'#64748b'}}>
                                    <i className="fa-solid fa-phone"></i> {owner.phone}
                                </div>
                                {/* CLICKING THIS TRIGGERS THE DETAIL VIEW */}
                                <button className="btn btn-sm btn-outline" onClick={() => setSelectedOwner(owner)}>
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="table-wrapper fade-in">
                    <table className="responsive-table">
                        <thead>
                            <tr>
                                <th>Name</th><th>Contact</th><th>Tables</th><th>Revenue</th><th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOwners.map(owner => (
                                <tr key={owner.id}>
                                    <td style={{fontWeight:600}}>{owner.name}</td>
                                    <td>{owner.email}</td>
                                    <td>{owner.tables}</td>
                                    <td>KES {owner.revenue.toLocaleString()}</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline" onClick={() => setSelectedOwner(owner)}>
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* 4. HD SLIDE-OVER DRAWER */}
            {isDrawerOpen && (
                <>
                    <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}></div>
                    <div className="slide-over-panel">
                        <div className="panel-header">
                            <h3 style={{margin:0, fontWeight:'600'}}>New Business Owner</h3>
                            <button onClick={() => setIsDrawerOpen(false)} style={{background:'none', border:'none', color:'white', fontSize:'1.4rem', cursor:'pointer'}}>&times;</button>
                        </div>

                        <form onSubmit={handleCreate} style={{display:'flex', flexDirection:'column', height:'100%'}}>
                            <div className="panel-body">
                                <p style={{color:'#64748b', marginBottom:'25px', fontSize:'0.9rem', lineHeight:'1.5'}}>
                                    Create a profile for a new partner. They will receive an automated email to set up their password.
                                </p>

                                <div className="fancy-input-group">
                                    <label>Full Legal Name</label>
                                    <input 
                                        type="text" className="fancy-input" placeholder="e.g. John Doe" required 
                                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                    <i className="fa-solid fa-user input-icon"></i>
                                </div>

                                <div className="fancy-input-group">
                                    <label>Email Address</label>
                                    <input 
                                        type="email" className="fancy-input" placeholder="john@example.com" required 
                                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                    />
                                    <i className="fa-solid fa-envelope input-icon"></i>
                                </div>

                                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px'}}>
                                    <div className="fancy-input-group">
                                        <label>Phone Number</label>
                                        <input 
                                            type="tel" className="fancy-input" placeholder="+254 7..." 
                                            value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                                        />
                                        <i className="fa-solid fa-phone input-icon"></i>
                                    </div>

                                    <div className="fancy-input-group">
                                        <label>Primary Location</label>
                                        <input 
                                            type="text" className="fancy-input" placeholder="e.g. Nairobi West" 
                                            value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                                        />
                                        <i className="fa-solid fa-map-pin input-icon"></i>
                                    </div>
                                </div>

                                <div style={{background:'#eff6ff', padding:'15px', borderRadius:'10px', fontSize:'0.85rem', color:'#1e40af', border: '1px solid #bfdbfe', display:'flex', gap:'10px'}}>
                                    <i className="fa-solid fa-circle-info" style={{marginTop:'3px'}}></i>
                                    <span>An onboarding email will be sent immediately. The owner cannot log in until they verify their email via the link sent.</span>
                                </div>
                            </div>

                            <div className="panel-footer">
                                <button type="button" className="btn btn-outline" onClick={() => setIsDrawerOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{minWidth:'140px'}}>Create Account</button>
                            </div>
                        </form>
                    </div>
                </>
            )}

        </div>
    );
};

export default OwnersPage;
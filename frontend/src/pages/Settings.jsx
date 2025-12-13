import React, { useState } from 'react';
import '../assets/css/Settings.css';

const Settings = () => {
    
    // --- STATE ---
    const [activeTab, setActiveTab] = useState('profile'); // profile, security, materials
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Form Data
    const [profile, setProfile] = useState({ name: 'Admin User', email: 'admin@system.com', role: 'Super Admin' });
    const [security, setSecurity] = useState({ twoFactor: true, emailAlerts: true, sessionTimeout: 30 });

    // --- HANDLERS ---
    const handleSave = () => {
        setIsSaving(true);
        // Simulate API delay
        setTimeout(() => {
            setIsSaving(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }, 1200);
    };

    const toggleSecurity = (field) => {
        setSecurity(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className="scroll-area fade-in">
            
            {/* PAGE HEADER */}
            <div style={{marginBottom:'30px'}}>
                <h1 style={{fontSize:'2rem', fontWeight:'800', color:'#0f172a', margin:0}}>Settings & Administration</h1>
                <p style={{color:'#64748b', margin:'8px 0 0'}}>Manage your profile, system assets, and security preferences.</p>
            </div>

            <div className="settings-layout">
                
                {/* 1. SIDEBAR NAVIGATION */}
                <div className="settings-nav">
                    <div className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                        <i className="fa-solid fa-user-circle"></i> Profile & Account
                    </div>
                    <div className={`nav-item ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
                        <i className="fa-solid fa-shield-halved"></i> Security & Access
                    </div>
                    <div className={`nav-item ${activeTab === 'materials' ? 'active' : ''}`} onClick={() => setActiveTab('materials')}>
                        <i className="fa-solid fa-folder-open"></i> System Materials
                    </div>
                    <div style={{margin:'20px 0', borderTop:'1px solid #e2e8f0'}}></div>
                    <div className="nav-item" style={{color:'#ef4444'}}>
                        <i className="fa-solid fa-right-from-bracket"></i> Sign Out
                    </div>
                </div>

                {/* 2. MAIN CONTENT PANEL */}
                <div className="settings-panel">
                    
                    {/* --- TAB: PROFILE --- */}
                    {activeTab === 'profile' && (
                        <div className="fade-in">
                            <div className="panel-header">
                                <h2>Admin Profile</h2>
                                <p>Update your personal details and public information.</p>
                            </div>

                            <div className="profile-header">
                                <div className="avatar-large">
                                    {profile.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 style={{margin:0, color:'#0f172a'}}>{profile.name}</h3>
                                    <span style={{fontSize:'0.85rem', color:'#64748b', background:'#f1f5f9', padding:'2px 8px', borderRadius:'4px'}}>{profile.role}</span>
                                    <div style={{marginTop:'10px'}}>
                                        <button className="btn-upload">Change Avatar</button>
                                        <button className="btn-upload" style={{marginLeft:'10px', background:'transparent', border:'none', color:'#ef4444'}}>Remove</button>
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                                    <div>
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-control" value={profile.name} onChange={(e)=>setProfile({...profile, name:e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="form-label">Email Address</label>
                                        <input type="email" className="form-control" value={profile.email} onChange={(e)=>setProfile({...profile, email:e.target.value})} />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="form-section">
                                <label className="form-label">Admin Role / Title</label>
                                <input type="text" className="form-control" value="System Administrator" disabled style={{background:'#f1f5f9', color:'#94a3b8'}} />
                                <p style={{fontSize:'0.8rem', color:'#94a3b8', marginTop:'5px'}}>Role permissions are managed by the Root user.</p>
                            </div>
                        </div>
                    )}

                    {/* --- TAB: SECURITY --- */}
                    {activeTab === 'security' && (
                        <div className="fade-in">
                            <div className="panel-header">
                                <h2>Security & Login</h2>
                                <p>Manage 2FA, password, and session timeouts.</p>
                            </div>

                            <div className="form-section">
                                <label className="form-label">Change Password</label>
                                <input type="password" className="form-control" placeholder="Current Password" style={{marginBottom:'10px'}} />
                                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                                    <input type="password" className="form-control" placeholder="New Password" />
                                    <input type="password" className="form-control" placeholder="Confirm New Password" />
                                </div>
                            </div>

                            <h4 style={{marginTop:'40px', marginBottom:'15px', color:'#0f172a'}}>Security Preferences</h4>
                            
                            <div className="switch-group">
                                <div>
                                    <div style={{fontWeight:'600', color:'#334155'}}>Two-Factor Authentication (2FA)</div>
                                    <div style={{fontSize:'0.85rem', color:'#64748b'}}>Secure your account with an OTP via Email.</div>
                                </div>
                                <div className={`toggle-switch ${security.twoFactor ? 'on' : ''}`} onClick={() => toggleSecurity('twoFactor')}>
                                    <div className="toggle-knob"></div>
                                </div>
                            </div>

                            <div className="switch-group">
                                <div>
                                    <div style={{fontWeight:'600', color:'#334155'}}>Login Alerts</div>
                                    <div style={{fontSize:'0.85rem', color:'#64748b'}}>Receive an email when a new device logs in.</div>
                                </div>
                                <div className={`toggle-switch ${security.emailAlerts ? 'on' : ''}`} onClick={() => toggleSecurity('emailAlerts')}>
                                    <div className="toggle-knob"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TAB: MATERIALS --- */}
                    {activeTab === 'materials' && (
                        <div className="fade-in">
                            <div className="panel-header">
                                <h2>System Materials</h2>
                                <p>Manage branding assets and downloadable admin resources.</p>
                            </div>

                            <div className="form-section">
                                <label className="form-label">System Logo (Branding)</label>
                                <div className="upload-zone">
                                    <i className="fa-solid fa-cloud-arrow-up upload-icon"></i>
                                    <div style={{fontWeight:'600', color:'#0f172a'}}>Click to upload or drag and drop</div>
                                    <p style={{fontSize:'0.85rem', color:'#94a3b8', margin:'5px 0'}}>SVG, PNG or JPG (Max 2MB)</p>
                                </div>
                            </div>

                            <div className="form-section">
                                <label className="form-label">Admin Documentation & Guides</label>
                                <div style={{background:'#f8fafc', borderRadius:'8px', border:'1px solid #e2e8f0'}}>
                                    <div style={{padding:'15px', borderBottom:'1px solid #e2e8f0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                        <div style={{display:'flex', gap:'15px', alignItems:'center'}}>
                                            <i className="fa-solid fa-file-pdf" style={{color:'#ef4444', fontSize:'1.2rem'}}></i>
                                            <div>
                                                <div style={{fontWeight:'600', fontSize:'0.9rem'}}>Admin_Handbook_v2.4.pdf</div>
                                                <div style={{fontSize:'0.75rem', color:'#94a3b8'}}>2.4 MB • Uploaded Dec 12</div>
                                            </div>
                                        </div>
                                        <button className="btn-upload"><i className="fa-solid fa-download"></i></button>
                                    </div>
                                    <div style={{padding:'15px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                        <div style={{display:'flex', gap:'15px', alignItems:'center'}}>
                                            <i className="fa-solid fa-file-excel" style={{color:'#166534', fontSize:'1.2rem'}}></i>
                                            <div>
                                                <div style={{fontWeight:'600', fontSize:'0.9rem'}}>Financial_Template_2025.xlsx</div>
                                                <div style={{fontSize:'0.75rem', color:'#94a3b8'}}>1.1 MB • Uploaded Nov 20</div>
                                            </div>
                                        </div>
                                        <button className="btn-upload"><i className="fa-solid fa-download"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* BOTTOM ACTION BAR */}
                    <div style={{marginTop:'40px', paddingTop:'20px', borderTop:'1px solid #f1f5f9', display:'flex', justifyContent:'flex-end'}}>
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            style={{
                                background: isSaving ? '#94a3b8' : '#0f172a',
                                color: 'white', border: 'none',
                                padding: '12px 32px', borderRadius: '8px',
                                fontSize: '0.95rem', fontWeight: '600',
                                cursor: isSaving ? 'wait' : 'pointer',
                                transition: 'all 0.2s',
                                display:'flex', alignItems:'center', gap:'10px'
                            }}
                        >
                            {isSaving && <i className="fa-solid fa-circle-notch fa-spin"></i>}
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>

                </div>
            </div>

            {/* TOAST NOTIFICATION */}
            {showToast && (
                <div className="toast-success">
                    <i className="fa-solid fa-circle-check" style={{color:'#4ade80', fontSize:'1.2rem'}}></i>
                    <div>
                        <div style={{fontWeight:'600'}}>Success</div>
                        <div style={{fontSize:'0.85rem', opacity:0.8}}>Settings updated successfully.</div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Settings;
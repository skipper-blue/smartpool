import React, { useState } from 'react';

const OwnerDetail = ({ owner, onBack }) => {
    // Mocking specific data for this owner (In real app, fetch this via API using owner.id)
    const assignedTables = [
        { id: 'T-101', location: 'Main Bar - Counter', status: 'Online', lastPing: '2 mins ago', earnings: 4500 },
        { id: 'T-102', location: 'Main Bar - Corner', status: 'Busy', lastPing: 'Just now', earnings: 12000 },
        { id: 'T-105', location: 'VIP Lounge', status: 'Offline', lastPing: '4 hours ago', earnings: 0 },
    ];

    return (
        <div className="owner-detail-container animate-fade-in">
            {/* --- HEADER / BANNER --- */}
            <div className="profile-banner">
                <button className="back-btn" onClick={onBack}>
                    <i className="fa-solid fa-arrow-left"></i> Back to List
                </button>
                <div className="banner-overlay"></div>
            </div>

            <div className="profile-content">
                {/* --- PROFILE HEADER INFO --- */}
                <div className="profile-header-card glow-card">
                    <div className="profile-avatar-lg">
                        {owner.name.charAt(0)}
                        <div className={`status-indicator-lg ${owner.status === 'Active' ? 'online' : 'busy'}`}></div>
                    </div>
                    <div className="profile-identity">
                        <div className="id-badges">
                            <span className="badge-pill">Owner ID: #{owner.id}</span>
                            <span className={`badge-pill ${owner.status.toLowerCase()}`}>{owner.status}</span>
                        </div>
                        <h1>{owner.name}</h1>
                        <div className="contact-row">
                            <span><i className="fa-solid fa-envelope"></i> {owner.email}</span>
                            <span><i className="fa-solid fa-phone"></i> {owner.phone}</span>
                            <span><i className="fa-solid fa-calendar"></i> Joined: Aug 2023</span>
                        </div>
                    </div>
                    <div className="profile-actions">
                        <button className="action-btn primary"><i className="fa-solid fa-pen"></i> Edit</button>
                        <button className="action-btn danger"><i className="fa-solid fa-ban"></i> Suspend</button>
                    </div>
                </div>

                <div className="detail-grid">
                    {/* --- LEFT COLUMN: STATS & MAP --- */}
                    <div className="left-col">
                        {/* Financial Stats */}
                        <div className="widget-card">
                            <h3>Performance Overview</h3>
                            <div className="stat-row">
                                <div className="stat-item">
                                    <label>Total Revenue</label>
                                    <div className="value success">KES {owner.revenue.toLocaleString()}</div>
                                </div>
                                <div className="stat-item">
                                    <label>This Month</label>
                                    <div className="value">KES 45,000</div>
                                </div>
                            </div>
                            <div className="stat-row">
                                <div className="stat-item">
                                    <label>Active Tables</label>
                                    <div className="value">{owner.tables} Units</div>
                                </div>
                                <div className="stat-item">
                                    <label>Commission Rate</label>
                                    <div className="value">15%</div>
                                </div>
                            </div>
                        </div>

                        {/* Location / Map */}
                        <div className="widget-card">
                            <h3><i className="fa-solid fa-map-location-dot"></i> Establishment Location</h3>
                            <p className="location-text">
                                {owner.location || 'Nairobi West, Commercial Ctr'}
                            </p>
                            <div className="map-placeholder-fancy">
                                <div className="map-marker-pulse">
                                    <i className="fa-solid fa-shop"></i>
                                </div>
                                <div className="map-grid-lines"></div>
                            </div>
                            <button className="btn-text">Open in Google Maps <i className="fa-solid fa-external-link-alt"></i></button>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: TABLES --- */}
                    <div className="right-col">
                        <div className="section-header">
                            <h3>Deployed Inventory ({assignedTables.length})</h3>
                            <button className="btn-sm btn-outline"><i className="fa-solid fa-plus"></i> Assign New</button>
                        </div>

                        <div className="tables-list">
                            {assignedTables.map((table, idx) => (
                                <div key={idx} className="table-row-card">
                                    <div className="table-icon">
                                        <i className="fa-solid fa-tablet-screen-button"></i>
                                    </div>
                                    <div className="table-info">
                                        <h4>{table.id}</h4>
                                        <span className="sub-text">{table.location}</span>
                                    </div>
                                    <div className="table-metrics">
                                        <div className="metric">
                                            <span>Earnings</span>
                                            <strong>{table.earnings}</strong>
                                        </div>
                                        <div className="metric">
                                            <span>Ping</span>
                                            <small>{table.lastPing}</small>
                                        </div>
                                    </div>
                                    <div className={`status-badge ${table.status.toLowerCase()}`}>
                                        {table.status}
                                    </div>
                                </div>
                            ))}
                            {/* Fill empty slots if user has more tables than shown in mock */}
                            {Array.from({ length: Math.max(0, owner.tables - assignedTables.length) }).map((_, i) => (
                                <div key={i} className="table-row-card skeleton">
                                    <div className="skeleton-line"></div>
                                    <div className="skeleton-badge"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerDetail;
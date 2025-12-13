import React, { useState, useMemo } from 'react';
import '../assets/css/Transactions.css';

const TransactionsPage = () => {
    // --- MOCK DATA ---
    const [transactions] = useState([
        { id: 'TX-1001', code: 'QGH12399AA', date: '2023-11-30 14:32', tableId: 'T-105', owner: 'John Doe', amount: 50, duration: '30 Min', status: 'Completed', method: 'M-Pesa' },
        { id: 'TX-1002', code: 'QGH12388BB', date: '2023-11-30 14:15', tableId: 'T-202', owner: 'Jane Smith', amount: 20, duration: '10 Min', status: 'Completed', method: 'M-Pesa' },
        { id: 'TX-1003', code: 'QGH12377CC', date: '2023-11-30 14:00', tableId: 'T-108', owner: 'John Doe', amount: 20, duration: '10 Min', status: 'Failed', method: 'Cash' },
        { id: 'TX-1004', code: 'QGH12366DD', date: '2023-11-30 13:45', tableId: 'T-105', owner: 'John Doe', amount: 50, duration: '30 Min', status: 'Completed', method: 'M-Pesa' },
        { id: 'TX-1005', code: 'QGH12355EE', date: '2023-11-30 13:30', tableId: 'T-301', owner: 'City Pub', amount: 100, duration: '1 Hr', status: 'Completed', method: 'M-Pesa' },
        { id: 'TX-1006', code: 'QGH12344FF', date: '2023-11-30 13:10', tableId: 'T-105', owner: 'John Doe', amount: 50, duration: '30 Min', status: 'Refunded', method: 'M-Pesa' },
        { id: 'TX-1007', code: 'QGH12333GG', date: '2023-11-30 12:45', tableId: 'T-202', owner: 'Jane Smith', amount: 40, duration: '20 Min', status: 'Completed', method: 'Cash' },
    ]);

    // --- STATE ---
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [tableFilter, setTableFilter] = useState('All');

    // --- FILTER LOGIC ---
    const filteredData = useMemo(() => {
        return transactions.filter(tx => {
            const matchesSearch = 
                tx.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
                tx.owner.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
            const matchesTable = tableFilter === 'All' || tx.tableId === tableFilter;

            return matchesSearch && matchesStatus && matchesTable;
        });
    }, [transactions, searchTerm, statusFilter, tableFilter]);

    // --- DERIVED STATS ---
    const totalRevenue = filteredData
        .filter(t => t.status === 'Completed')
        .reduce((sum, t) => sum + t.amount, 0);

    const uniqueTables = [...new Set(transactions.map(t => t.tableId))];

    // Calculate revenue per table for the widget
    const tablePerformance = uniqueTables.map(id => {
        const total = transactions
            .filter(t => t.tableId === id && t.status === 'Completed')
            .reduce((sum, t) => sum + t.amount, 0);
        return { id, total };
    }).sort((a, b) => b.total - a.total); // Sort highest earning first

    return (
        <div className="tx-page fade-in">
            
            {/* 1. TOP INSIGHTS WIDGETS */}
            <div className="tx-stats-grid">
                {/* Total Revenue Card */}
                <div className="tx-stat-card glow-card">
                    <div className="icon-box green"><i className="fa-solid fa-sack-dollar"></i></div>
                    <div className="stat-content">
                        <label>Total Revenue (Filtered)</label>
                        <h2>KES {totalRevenue.toLocaleString()}</h2>
                    </div>
                </div>

                {/* Transaction Volume Card */}
                <div className="tx-stat-card glow-card">
                    <div className="icon-box blue"><i className="fa-solid fa-list-check"></i></div>
                    <div className="stat-content">
                        <label>Transactions</label>
                        <h2>{filteredData.length}</h2>
                    </div>
                </div>

                {/* Top Performing Table Mini-List */}
                <div className="tx-stat-card table-perf-card">
                    <div className="card-header-mini">
                        <label>Top Earning Tables</label>
                        <i className="fa-solid fa-trophy gold"></i>
                    </div>
                    <div className="perf-list">
                        {tablePerformance.slice(0, 3).map((t, i) => (
                            <div key={t.id} className="perf-row">
                                <span className="rank">#{i+1}</span>
                                <span className="t-id">{t.id}</span>
                                <span className="t-val">KES {t.total}</span>
                                <div className="perf-bar" style={{width: `${(t.total / tablePerformance[0].total) * 100}%`}}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. MAIN TRANSACTION LOG */}
            <div className="tx-main-container">
                <div className="tx-toolbar">
                    <div className="toolbar-left">
                        <h3>Master Transaction Log</h3>
                        <span className="badge-count">{filteredData.length} Records</span>
                    </div>
                    
                    <div className="toolbar-right">
                        {/* Search Input */}
                        <div className="search-box">
                            <i className="fa-solid fa-search"></i>
                            <input 
                                type="text" 
                                placeholder="Search code or owner..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Table Filter */}
                        <select className="filter-select" value={tableFilter} onChange={(e) => setTableFilter(e.target.value)}>
                            <option value="All">All Tables</option>
                            {uniqueTables.map(id => <option key={id} value={id}>{id}</option>)}
                        </select>

                        {/* Status Filter */}
                        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="All">All Status</option>
                            <option value="Completed">Completed</option>
                            <option value="Failed">Failed</option>
                            <option value="Refunded">Refunded</option>
                        </select>

                        <button className="btn-export" onClick={() => alert('Downloading CSV...')}>
                            <i className="fa-solid fa-cloud-arrow-down"></i> Export
                        </button>
                    </div>
                </div>

                <div className="table-responsive-wrapper">
                    <table className="tx-table">
                        <thead>
                            <tr>
                                <th>Transaction Code</th>
                                <th>Date/Time</th>
                                <th>Table ID</th>
                                <th>Owner</th>
                                <th>Amount</th>
                                <th>Duration</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((tx) => (
                                    <tr key={tx.id}>
                                        <td className="mono-font">
                                            <i className="fa-solid fa-receipt tx-icon"></i> {tx.code}
                                        </td>
                                        <td className="text-muted">{tx.date}</td>
                                        <td><span className="table-badge">{tx.tableId}</span></td>
                                        <td>{tx.owner}</td>
                                        <td className="amount">KES {tx.amount}</td>
                                        <td>{tx.duration}</td>
                                        <td>
                                            <span className={`status-badge ${tx.status.toLowerCase()}`}>
                                                {tx.status === 'Completed' && <i className="fa-solid fa-check"></i>}
                                                {tx.status === 'Failed' && <i className="fa-solid fa-xmark"></i>}
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-icon"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="empty-state-row">
                                        <i className="fa-solid fa-filter-circle-xmark"></i>
                                        <p>No transactions match your filters</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;
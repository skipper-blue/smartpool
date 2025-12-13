import React from 'react';
import '../assets/css/ActivityTable.css';

const ActivityTable = ({ transactions }) => {
    // Check if data exists
    const hasData = transactions && transactions.length > 0;

    return (
        <div className="table-wrapper">
            <div className="table-header-row">
                <h3>Live Activity Feed</h3>
                <button className="btn-outline">View All</button>
            </div>

            {/* CONDITIONAL RENDERING */}
            {hasData ? (
                // 1. Show Table if we have data
                <div className="responsive-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Table</th>
                                <th>Location</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx, index) => (
                                <tr key={index}>
                                    <td>{tx.time}</td>
                                    <td>{tx.tableId}</td>
                                    <td>{tx.location}</td>
                                    <td>{tx.amount}</td>
                                    <td>
                                        <span className={`status ${tx.status === 'Active' ? 'success' : 'danger'}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                // 2. Show "Empty State" if no data
                <div className="empty-table-state">
                    <div className="empty-icon-bg">
                        {/* You can use an icon class here like FontAwesome */}
                        <i className="fa-solid fa-server"></i> 
                    </div>
                    <h4>No transactions found</h4>
                    <p>Waiting for data stream from database...</p>
                </div>
            )}
        </div>
    );
};

export default ActivityTable;
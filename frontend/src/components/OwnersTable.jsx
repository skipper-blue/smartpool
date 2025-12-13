import React from 'react';

function OwnersTable({ owners, onEdit }) {
    return (
        <div className="table-wrapper">
            <div className="responsive-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Tables</th>
                            <th>Commission</th>
                            <th>Total Earned</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {owners.map((owner) => (
                            <tr key={owner.id}>
                                <td><b>{owner.name}</b></td>
                                <td>{owner.phone}</td>
                                <td>{owner.tables}</td>
                                <td>{owner.commission}</td>
                                <td>{owner.earned}</td>
                                <td>
                                    <button 
                                        className="btn btn-sm btn-outline"
                                        onClick={() => onEdit(owner)} // Trigger Parent function
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                        
                        {owners.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                    No owners found. Click "Register New Owner" to add one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OwnersTable;
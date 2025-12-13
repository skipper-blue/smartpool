import React, { useState } from 'react';
import '../assets/css/Owners.css'; // Import the styles
import AddOwnerModal from '../components/modals/AddOwnerModal';
import EditOwnerModal from '../components/modals/EditOwnerModal';

const OwnersPage = () => {
    // 1. The Data State (Simulating a Database)
    const [ownersData, setOwnersData] = useState([
        { id: 1, name: 'John Doe', phone: '0722 123 456', tables: 4, commission: '80%', earned: 'KES 450,000' },
        { id: 2, name: 'Jane Smith', phone: '0733 987 654', tables: 12, commission: '85%', earned: 'KES 1.2M' },
        { id: 3, name: 'Michael Kamau', phone: '0711 000 111', tables: 2, commission: '80%', earned: 'KES 80,000' },
    ]);

    // 2. Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState(null);

    // 3. Handlers
    const handleAddOwner = (newOwner) => {
        // Create a new entry with a temporary ID
        const newId = ownersData.length + 1;
        const entry = { ...newOwner, id: newId, earned: 'KES 0' };
        setOwnersData([...ownersData, entry]);
        setIsAddModalOpen(false);
    };

    const handleEditClick = (owner) => {
        setSelectedOwner(owner);
        setIsEditModalOpen(true);
    };

    const handleSaveOwner = (updatedOwner) => {
        const updatedList = ownersData.map(item => 
            item.id === updatedOwner.id ? updatedOwner : item
        );
        setOwnersData(updatedList);
        setIsEditModalOpen(false);
    };

    return (
        <div className="scroll-area fade-in">
            {/* --- YOUR HTML STRUCTURE --- */}
            <div id="owners" className="section">
                
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>Pool Table Owners</h3>
                    <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
                        <i className="fa-solid fa-plus"></i> Add Owner
                    </button>
                </div>

                {/* Table Section */}
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
                                {/* Loop through state to display rows */}
                                {ownersData.map((owner) => (
                                    <tr key={owner.id}>
                                        <td><b>{owner.name}</b></td>
                                        <td>{owner.phone}</td>
                                        <td>{owner.tables}</td>
                                        <td>{owner.commission}</td>
                                        <td>{owner.earned}</td>
                                        <td>
                                            <button 
                                                className="btn btn-sm btn-outline"
                                                onClick={() => handleEditClick(owner)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* --- MODALS (Hidden by default) --- */}
            <AddOwnerModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onAdd={handleAddOwner} 
            />
            
            <EditOwnerModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                owner={selectedOwner} 
                onSave={handleSaveOwner} 
            />
        </div>
    );
};

export default OwnersPage;
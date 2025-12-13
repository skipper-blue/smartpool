import React, { useState, useEffect } from 'react';
import '../../assets/css/Modal.css';

const EditOwnerModal = ({ isOpen, onClose, owner, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        tables: '',
        commission: '',
        earned: ''
    });

    // Populate form when 'owner' prop changes
    useEffect(() => {
        if (owner) {
            setFormData(owner);
        }
    }, [owner]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Send updated data back to Parent
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content fade-in-up">
                <div className="modal-header">
                    <h3>Edit Owner Details</h3>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input 
                            type="text" name="name" className="form-input" 
                            value={formData.name} onChange={handleChange} required 
                        />
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Phone</label>
                            <input 
                                type="text" name="phone" className="form-input" 
                                value={formData.phone} onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Tables</label>
                            <input 
                                type="number" name="tables" className="form-input" 
                                value={formData.tables} onChange={handleChange} 
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Commission</label>
                        <input 
                            type="text" name="commission" className="form-input" 
                            value={formData.commission} onChange={handleChange} 
                        />
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditOwnerModal;
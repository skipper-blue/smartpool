import React, { useState } from 'react';
import '../../assets/css/Modal.css'; // Ensure you have the CSS we created earlier

const AddOwnerModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        tables: '',
        commission: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData); // Send new data to Parent
        // Reset form
        setFormData({ name: '', phone: '', tables: '', commission: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content fade-in-up">
                <div className="modal-header">
                    <h3>Register New Owner</h3>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name *</label>
                        <input 
                            type="text" name="name" className="form-input" placeholder="e.g. John Kamau"
                            value={formData.name} onChange={handleChange} required 
                        />
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Phone Number *</label>
                            <input 
                                type="text" name="phone" className="form-input" placeholder="07..."
                                value={formData.phone} onChange={handleChange} required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Initial Tables</label>
                            <input 
                                type="number" name="tables" className="form-input" placeholder="0"
                                value={formData.tables} onChange={handleChange} 
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Commission Rate (%)</label>
                        <input 
                            type="text" name="commission" className="form-input" placeholder="e.g. 10%"
                            value={formData.commission} onChange={handleChange} 
                        />
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">Register Owner</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddOwnerModal;
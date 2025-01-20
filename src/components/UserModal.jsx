import React, { useState } from 'react';
import './UserModal.scss';

const UserModal = ({ isOpen, user, closeModal, onSuspend, onSave }) => {
    const [editedUser, setEditedUser] = useState(user);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSave = () => {
        onSave(editedUser); // Llama la función para guardar cambios
        closeModal();
    };

    const handleSuspend = () => {
        onSuspend(editedUser.id); // Llama la función para suspender
        closeModal();
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
            <div className="modal-container">
                <h2>Editar Usuario</h2>
                <form>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={editedUser.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleChange}
                        />
                    </div>
                </form>

                <div className="modal-actions">
                    <button className="btn-save" onClick={handleSave}>
                        Guardar Cambios
                    </button>
                    <button className="btn-suspend" onClick={handleSuspend}>
                        {user.isSuspended ? 'Habilitar' : 'Deshabilitar'}
                    </button>
                    <button className="btn-close" onClick={closeModal}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserModal;

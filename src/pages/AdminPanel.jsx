import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.scss';
import UserModal from '../components/UserModal';

const AdminPanel = () => {
    const [users, setUsers] = useState([]); // Lista de usuarios
    const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para el modal
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

    // Función para obtener la lista de usuarios
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data.users); // Guardar lista de usuarios
        } catch (error) {
            console.error('Error al obtener la lista de usuarios:', error);
        }
    };

    // Llamar a fetchUsers al montar el componente
    useEffect(() => {
        fetchUsers();
    }, []);

    // Función para refrescar la lista de usuarios
    const refreshUsers = () => {
        fetchUsers();
    };


    // Abrir el modal para gestionar un usuario
    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // Cerrar el modal
    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    // Suspender o habilitar un usuario
    const handleSuspend = async (userId) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/users/${userId}/suspend`);
            alert(response.data.message); // Muestra el mensaje de éxito
            refreshUsers(); // Refresca la lista de usuarios
        } catch (error) {
            console.error('Error al suspender/habilitar usuario:', error);
            alert('No se pudo suspender o habilitar el usuario.');
        }
    };


    // Guardar los cambios realizados a un usuario
    const handleSave = async (updatedUser) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/users/${updatedUser.id}`, updatedUser);
            const savedUser = response.data.user;

            // Actualizar la lista de usuarios localmente
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === savedUser.id ? savedUser : user
                )
            );
            closeModal(); // Cerrar el modal después de guardar
        } catch (error) {
            console.error('Error al guardar los cambios del usuario:', error);
        }
    };

    return (
        <div className="admin-panel">
            <h1>Panel de Administrador</h1>
            <p>Gestión de usuarios registrados paGon</p>

            <div className="user-list">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isSuspended ? 'Suspendido' : 'Activo'}</td>
                                <td>
                                    <button onClick={() => handleUserClick(user)}>Gestionar</button>
                                    <button onClick={() => handleSuspend(user._id)}>
                                        {user.isSuspended ? 'Habilitar' : 'Deshabilitar'}
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para gestionar usuario */}
            {isModalOpen && (
                <UserModal
                    isOpen={isModalOpen}
                    user={selectedUser}
                    closeModal={closeModal}
                    onSuspend={handleSuspend}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default AdminPanel;

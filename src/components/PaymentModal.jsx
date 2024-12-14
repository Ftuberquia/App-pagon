import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './PaymentModal.scss';

const PaymentModal = ({ isOpen, closeModal, userId }) => {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('payment');
    const [message, setMessage] = useState('');

    const handleAmountChange = (value) => setAmount(value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/transactions', {
                userId,
                amount: parseFloat(amount),
                type,
            });
            setMessage('Transacción realizada con éxito');
            setAmount('');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error al realizar la transacción');
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Formulario de Pago"
            className="payment-modal" overlayClassName="modal-backdrop">
            <h2>Formulario de Pago</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Monto:</label>
                    <input type="number" value={amount} onChange={(e) => handleAmountChange(e.target.value)} min="2000" />
                    <div className="preset-buttons">
                        <button type="button" onClick={() => handleAmountChange(5000)}>5,000</button>
                        <button type="button" onClick={() => handleAmountChange(10000)}>10,000</button>
                        <button type="button" onClick={() => handleAmountChange(20000)}>20,000</button>
                    </div>
                </div>
                <div>
                    <label>Tipo:</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="deposit">Recarga</option>
                        <option value="payment">Pago</option>
                    </select>
                </div>
                <button type="submit">Confirmar</button>
                <button type="button" onClick={closeModal}>Cerrar</button>
            </form>
        </Modal>
    );
};

export default PaymentModal;

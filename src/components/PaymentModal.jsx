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
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Formulario de Pago"
            className="payment-modal"
            overlayClassName="modal-backdrop"
        >
            <h2 className="payment-modal__header">Formulario de Pago</h2>
            {message && <p className="payment-modal__message">{message}</p>}
            <form className="payment-modal__body" onSubmit={handleSubmit}>
                <div className="payment-modal__field">
                    <label className="payment-modal__label">Monto:</label>
                    <input
                        type="number"
                        className="payment-modal__input"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        min="2000"
                    />
                    <div className="preset-buttons">
                        <button
                            type="button"
                            className="preset-button"
                            onClick={() => handleAmountChange(5000)}
                        >
                            5,000
                        </button>
                        <button
                            type="button"
                            className="preset-button"
                            onClick={() => handleAmountChange(10000)}
                        >
                            10,000
                        </button>
                        <button
                            type="button"
                            className="preset-button"
                            onClick={() => handleAmountChange(20000)}
                        >
                            20,000
                        </button>
                    </div>
                </div>
                <div className="payment-modal__field">
                    <label className="payment-modal__label">Tipo:</label>
                    <select
                        value={type}
                        className="payment-modal__select"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="deposit">Recarga</option>
                        <option value="payment">Pago</option>
                    </select>
                </div>
                <div className="payment-modal__footer">
                    <button type="submit" className="payment-modal__button payment-modal__button--confirm">
                        Confirmar
                    </button>
                    <button
                        type="button"
                        className="payment-modal__button payment-modal__button--cancel"
                        onClick={closeModal}
                    >
                        Cerrar
                    </button>
                </div>
            </form>
        </Modal>

    );
};

export default PaymentModal;

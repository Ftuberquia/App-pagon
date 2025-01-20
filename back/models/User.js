const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definir el esquema del usuario
const UserSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'], minlength: 3 },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    balance: { type: Number, default: 0 }, // Nuevo campo para el saldo
    role: { type: String, default: 'user' },
    isSuspended: { type: Boolean, default: false }, // Nuevo campo para gestionar suspensión
}, {
    timestamps: true,
});


// Middleware para cifrar la contraseña antes de guardarla
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();  // Solo cifrar si se modificó la contraseña
    this.password = await bcrypt.hash(this.password, 10);  // Cifrado con bcrypt
    next();
});

// Método para comparar la contraseña cifrada durante el inicio de sesión
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);  // Compara la contraseña ingresada con la cifrada
};

// Exportar el modelo asegurando que el nombre de la colección sea 'users'
module.exports = mongoose.model('User', UserSchema, 'users'); // 'users' es el nombre de la colección en Atlas

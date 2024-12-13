const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definir el esquema del usuario
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
}, {
    timestamps: true,  // Esto crea automáticamente los campos createdAt y updatedAt
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

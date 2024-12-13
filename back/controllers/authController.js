const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const users = new User({ name, email, password });
        await users.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const users = await User.findOne({ email });
        if (!users) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, users.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: users._id, role: users.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, users: { id: users._id, name: users.name, email: users.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login };

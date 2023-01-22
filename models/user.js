const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: { type: String, trim: true },
    lastname: { type: String, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, minlength: 8, trim: true, required: true },
    phone: { type: String, minlength: 10, maxlength: 11 },
    referral: { type: String },
    status: { type: String, default: "inactive" },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

const User = mongoose.model('users', UserSchema);

module.exports = User;

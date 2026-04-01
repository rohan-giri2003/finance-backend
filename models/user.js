const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // This handles Section 1 of your assignment (Roles)
    role: { 
        type: String, 
        enum: ['Admin', 'Analyst', 'Viewer'], 
        default: 'Viewer' 
    },
    status: { 
        type: String, 
        enum: ['Active', 'Inactive'], 
        default: 'Active' 
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
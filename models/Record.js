const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    type: { 
        type: String, 
        enum: ['Income', 'Expense'], 
        required: true 
    },
    category: { type: String, required: true }, // e.g., Food, Salary, Rent
    date: { type: Date, default: Date.now },
    description: { type: String },
    // This links the record to the User who created it
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Record', RecordSchema);
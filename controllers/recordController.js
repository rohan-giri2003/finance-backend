const Record = require('../models/Record');

/**
 * 1. CREATE A NEW RECORD (Requirement 2)
 * This logic handles adding a new transaction (Income/Expense).
 */
exports.createRecord = async (req, res) => {
    try {
        const { amount, type, category, description, userId } = req.body;

        // Basic Validation (Requirement 5)
        if (!amount || !type || !category) {
            return res.status(400).json({ message: "Please provide amount, type, and category." });
        }

        const newRecord = new Record({
            amount,
            type,
            category,
            description,
            createdBy: userId
        });

        const savedRecord = await newRecord.save();
        res.status(201).json({ 
            message: "Record created successfully!", 
            data: savedRecord 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * 2. GET ALL RECORDS (Requirement 2)
 * Fetch all entries from the database.
 */
exports.getRecords = async (req, res) => {
    try {
        const records = await Record.find().populate('createdBy', 'name role');
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * 3. DASHBOARD SUMMARY (Requirement 3)
 * Calculates Total Income, Total Expenses, and Net Balance.
 */
exports.getDashboardSummary = async (req, res) => {
    try {
        const records = await Record.find();

        let totalIncome = 0;
        let totalExpense = 0;

        records.forEach(record => {
            if (record.type === 'Income') {
                totalIncome += record.amount;
            } else if (record.type === 'Expense') {
                totalExpense += record.amount;
            }
        });

        // Sending back the analytics data
        res.status(200).json({
            totalIncome,
            totalExpense,
            netBalance: totalIncome - totalExpense,
            totalRecords: records.length,
            currency: "INR"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * 4. DELETE A RECORD (Requirement 2)
 * Allows deleting a record by its ID.
 */
exports.deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecord = await Record.findByIdAndDelete(id);

        if (!deletedRecord) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
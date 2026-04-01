const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

// 1. Naya record banane ke liye (POST)
// URL: http://localhost:5000/api/records
router.post('/records', recordController.createRecord);

// 2. Saare records dekhne ke liye (GET)
// URL: http://localhost:5000/api/records
router.get('/records', recordController.getRecords);

// 3. Dashboard Summary dekhne ke liye (GET) - Requirement 3
// URL: http://localhost:5000/api/dashboard-summary
router.get('/dashboard-summary', recordController.getDashboardSummary);

// 4. Record delete karne ke liye (DELETE) - Requirement 2
// URL: http://localhost:5000/api/records/:id
router.delete('/records/:id', recordController.deleteRecord);

module.exports = router;
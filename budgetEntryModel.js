const mongoose = require('mongoose');

const budgetEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true,'Title is required for the budget entry'],
  },
  relatedvalue: {
    type: Number, 
    required: [true,'Amount of budget is required for each budget entry'],
  },
  color: {
    type: String,
    required: [true,'Color is required for each budget entry and must conform to the hexadecimal format with at least 6 digits'],
    match: /^#([0-9a-fA-F]{6,})$/i,
  },
});

const BudgetEntry = mongoose.model('BudgetEntry', budgetEntrySchema);

module.exports = BudgetEntry;
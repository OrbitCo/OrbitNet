const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  issuanceHash: {
    type: String,
    required: true,
    unique: true,
  },
  networkId: {
    type: Number,
    required: true,
  },
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  toJSON: {
    getters: true,
    transform: (doc, ret) => {
      delete ret._id;
    },
  },
});

module.exports = mongoose.model('Loan', LoanSchema);

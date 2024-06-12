const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  total_spend: {
    type: Number,
    default: 0
  },
  last_visit: {
    type: Date,
    default: Date.now
  },
  total_visits: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Customer', customerSchema);

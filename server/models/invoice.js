const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceId: [{
    type: Object,
    required: true,
  }],
  name: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("invoice", invoiceSchema);

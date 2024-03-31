const express = require("express");
const router = express.Router();
const Invoice = require("../models/invoice");

// Create a new invoice
router.post("/addinvoices", async (req, res) => {
    try {
      const { invoiceId, name, address } = req.body;
  
      const newInvoice = new Invoice({
        invoiceId,
        name,
        address,
      });
  
      await newInvoice.save();
      res.status(201).json({ status: "SUCCESS", data: newInvoice });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all invoices
router.get("/allinvoices", async (req, res) => {
    try {
      const invoices = await Invoice.find();
      res.status(200).json({ status: "SUCCESS", data: invoices });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get a single invoice by ID
router.get("/invoices/:id", async (req, res) => {
    try {
      const invoice = await Invoice.findById(req.params.id);
      if (!invoice) {
        res.status(404).json({ status: "FAILED", message: "Invoice not found" });
        return;
      }
      res.status(200).json({ status: "SUCCESS", data: invoice });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  module.exports = router;
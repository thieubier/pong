// backend/src/controllers/invoiceController.js
const pdfGenerator = require('../utils/pdfGenerator');
const csvGenerator = require('../utils/csvGenerator');
const fs = require('fs');
const path = require('path');

exports.generateInvoicePDF = async (req, res) => {
    const invoiceData = req.body;
    const pdfDoc = pdfGenerator.generateInvoicePDF(invoiceData);
    const filePath = path.join(__dirname, '..', 'invoices', `invoice-${Date.now()}.pdf`);

    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.end();

    res.download(filePath);
};

exports.exportCSV = async (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, '..', 'exports', `export-${Date.now()}.csv`);

    await csvGenerator.generateCSV(data, filePath);

    res.download(filePath);
};

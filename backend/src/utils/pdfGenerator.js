// backend/src/utils/pdfGenerator.js
const PDFDocument = require('pdfkit');

exports.generateInvoicePDF = (invoiceData) => {
    const doc = new PDFDocument();
    // Ajouter le contenu PDF ici
    return doc;
};

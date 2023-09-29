const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("port deparing");
});

const PDFDocument = require("pdfkit");
const fs = require("fs");

const invoiceData = {
  invoicenumber: "1234",
  buyeraddress: "Alıcı Adresi",
  item: "Ürün Adı",
  price: "100.00",
};

const doc = new PDFDocument();

// pipe fs ile bağlantı sağladı
doc.pipe(fs.createWriteStream(`invoices_pdf/${invoiceData.invoicenumber}.pdf`));

doc.fontSize(18).text("Fatura", { align: "center" });
doc
  .fontSize(12)
  .text(`Fatura Numarası: ${invoiceData.invoicenumber}`, { align: "left" });
doc
  .fontSize(12)
  .text(`Alıcı Adresi: ${invoiceData.buyeraddress}`, { align: "left" });
doc.fontSize(12).text(`Ürün Adı: ${invoiceData.item}`, { align: "left" });
doc.fontSize(12).text(`Fiyat: $${invoiceData.price}`, { align: "left" });

doc.end();

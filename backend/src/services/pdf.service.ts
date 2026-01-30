import PDFDocument from 'pdfkit';
import { Response } from 'express';
import { prisma } from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';

export const generateInvoicePdf = async (invoiceId: string, res: Response): Promise<void> => {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      payment: {
        include: {
          member: true,
        },
      },
    },
  });

  if (!invoice) {
    throw new AppError('Invoice not found', 404);
  }

  const { payment } = invoice;
  const { member } = payment;

  // Create PDF document
  const doc = new PDFDocument({ margin: 50 });

  // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`
  );

  // Pipe the PDF to the response
  doc.pipe(res);

  // Colors
  const primaryColor = '#f0dd35';
  const darkColor = '#121212';
  const grayColor = '#989898';

  // Header
  doc
    .fillColor(darkColor)
    .fontSize(28)
    .font('Helvetica-Bold')
    .text('STRONGX', 50, 50);

  doc
    .fillColor(primaryColor)
    .fontSize(32)
    .text('', 155, 42); // Position for X

  doc
    .fillColor(grayColor)
    .fontSize(10)
    .font('Helvetica')
    .text('Premium Fitness Center', 50, 80);

  // Invoice Title
  doc
    .fillColor(darkColor)
    .fontSize(20)
    .font('Helvetica-Bold')
    .text('INVOICE', 400, 50, { align: 'right' });

  doc
    .fillColor(grayColor)
    .fontSize(10)
    .font('Helvetica')
    .text(`#${invoice.invoiceNumber}`, 400, 75, { align: 'right' });

  // Divider
  doc
    .moveTo(50, 110)
    .lineTo(550, 110)
    .strokeColor(grayColor)
    .lineWidth(0.5)
    .stroke();

  // Invoice Details
  const detailsY = 130;

  doc
    .fillColor(grayColor)
    .fontSize(10)
    .text('Date Issued:', 50, detailsY);
  doc
    .fillColor(darkColor)
    .text(invoice.issuedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }), 130, detailsY);

  doc
    .fillColor(grayColor)
    .text('Payment ID:', 50, detailsY + 20);
  doc
    .fillColor(darkColor)
    .text(payment.paymentId, 130, detailsY + 20);

  doc
    .fillColor(grayColor)
    .text('Payment Method:', 50, detailsY + 40);
  doc
    .fillColor(darkColor)
    .text(payment.paymentMethod.replace('_', ' '), 130, detailsY + 40);

  // Bill To
  doc
    .fillColor(grayColor)
    .fontSize(10)
    .text('Bill To:', 350, detailsY);
  doc
    .fillColor(darkColor)
    .fontSize(12)
    .font('Helvetica-Bold')
    .text(`${member.firstName} ${member.lastName}`, 350, detailsY + 15);
  doc
    .font('Helvetica')
    .fontSize(10)
    .text(`Member ID: ${member.memberId}`, 350, detailsY + 30);
  doc.text(member.email, 350, detailsY + 45);
  doc.text(member.phone, 350, detailsY + 60);

  // Table Header
  const tableY = 250;

  doc
    .fillColor('#f5f5f5')
    .rect(50, tableY, 500, 25)
    .fill();

  doc
    .fillColor(darkColor)
    .fontSize(10)
    .font('Helvetica-Bold')
    .text('Description', 60, tableY + 8)
    .text('Amount', 450, tableY + 8, { align: 'right' });

  // Table Row
  doc
    .font('Helvetica')
    .fillColor(darkColor)
    .text(payment.description || 'Gym Membership Payment', 60, tableY + 35)
    .fillColor(darkColor)
    .font('Helvetica-Bold')
    .text(`$${payment.amount.toNumber().toFixed(2)}`, 450, tableY + 35, { align: 'right' });

  // Divider before total
  doc
    .moveTo(350, tableY + 60)
    .lineTo(550, tableY + 60)
    .strokeColor(grayColor)
    .stroke();

  // Total
  doc
    .fontSize(12)
    .fillColor(grayColor)
    .font('Helvetica')
    .text('Total:', 350, tableY + 75)
    .fillColor(darkColor)
    .font('Helvetica-Bold')
    .fontSize(16)
    .text(`$${payment.amount.toNumber().toFixed(2)}`, 450, tableY + 73, { align: 'right' });

  // Status Badge
  const statusY = tableY + 110;
  const statusColor = payment.status === 'COMPLETED' ? '#22c55e' :
                      payment.status === 'PENDING' ? '#f59e0b' : '#ef4444';

  doc
    .fillColor(statusColor)
    .roundedRect(450, statusY, 80, 25, 5)
    .fill();

  doc
    .fillColor('#ffffff')
    .fontSize(10)
    .font('Helvetica-Bold')
    .text(payment.status, 460, statusY + 8, { width: 60, align: 'center' });

  // Footer
  const footerY = 700;

  doc
    .moveTo(50, footerY)
    .lineTo(550, footerY)
    .strokeColor(grayColor)
    .lineWidth(0.5)
    .stroke();

  doc
    .fillColor(grayColor)
    .fontSize(9)
    .font('Helvetica')
    .text('StrongX Premium Fitness Center', 50, footerY + 15, { align: 'center' })
    .text('123 Fitness Ave, Elite District, NY 10001', 50, footerY + 28, { align: 'center' })
    .text('contact@strongx.com | +259 (0) 256 215', 50, footerY + 41, { align: 'center' });

  doc
    .fillColor(primaryColor)
    .fontSize(8)
    .text('Thank you for being a StrongX member!', 50, footerY + 60, { align: 'center' });

  // Finalize PDF
  doc.end();
};

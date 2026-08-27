const nodemailer = require('nodemailer');

// Email notification is optional: if SMTP env vars aren't set, this is a
// silent no-op so the API still works (enquiries are always saved to disk
// via lib/store.js regardless of whether email is configured).
function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

async function sendEnquiryEmail(enquiry) {
  const transport = getTransport();
  if (!transport) return; // not configured — skip quietly

  const to = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;

  await transport.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject: `New Muto Tours enquiry from ${enquiry.full_name}`,
    text: [
      `Name: ${enquiry.full_name}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone || '-'}`,
      `Party size: ${enquiry.party_size || '-'}`,
      `Interested in: ${enquiry.destination_interest || '-'}`,
      `Travel dates: ${enquiry.travel_dates || '-'}`,
      '',
      enquiry.message,
    ].join('\n'),
  });
}

module.exports = { sendEnquiryEmail };

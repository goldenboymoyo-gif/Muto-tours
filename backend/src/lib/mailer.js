const nodemailer = require('nodemailer');

// Email is optional throughout: if SMTP env vars aren't set, every function
// below is a silent no-op so the API still works — enquiries are always
// saved to the database/disk and subscribers always saved, regardless of
// whether email is configured.
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

const FROM_NAME = 'Muto Tours';

function fromAddress() {
  return `${FROM_NAME} <${process.env.SMTP_FROM || process.env.SMTP_USER}>`;
}

// --- Sent to the Muto Tours team when a new enquiry comes in -------------

async function sendEnquiryEmail(enquiry) {
  const transport = getTransport();
  if (!transport) return;

  const to = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;

  await transport.sendMail({
    from: fromAddress(),
    to,
    replyTo: enquiry.email,
    subject: `New enquiry from ${enquiry.full_name}`,
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

// --- Sent to the person who submitted the enquiry -------------------------

async function sendEnquiryConfirmationEmail(enquiry) {
  const transport = getTransport();
  if (!transport) return;

  const ownerEmail = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;

  await transport.sendMail({
    from: fromAddress(),
    to: enquiry.email,
    replyTo: ownerEmail,
    subject: 'We’ve received your enquiry — Muto Tours',
    text: [
      `Hi ${enquiry.full_name.split(' ')[0]},`,
      '',
      'Thank you for reaching out to Muto Tours. We’ve received your trip enquiry ' +
        'and a member of our team will be in touch from this address within one business day.',
      '',
      'Here’s a copy of what you sent us:',
      '',
      `Destination or experience: ${enquiry.destination_interest || '-'}`,
      `Approximate travel dates: ${enquiry.travel_dates || '-'}`,
      `Party size: ${enquiry.party_size || '-'}`,
      '',
      `"${enquiry.message}"`,
      '',
      'If anything above needs correcting, or you’d like to add details in the meantime, ' +
        'just reply to this email — it comes straight to our team.',
      '',
      'Warm regards,',
      'The Muto Tours Team',
    ].join('\n'),
    html: renderEmail({
      heading: 'Thank you for your enquiry',
      body: `
        <p>Hi ${escapeHtml(enquiry.full_name.split(' ')[0])},</p>
        <p>Thank you for reaching out to Muto Tours. We've received your trip enquiry and a
        member of our team will be in touch from this address within one business day.</p>
        <p style="margin-top:24px;font-weight:600;">Here's a copy of what you sent us:</p>
        <table style="width:100%;border-collapse:collapse;margin-top:8px;">
          ${emailRow('Destination or experience', enquiry.destination_interest)}
          ${emailRow('Approximate travel dates', enquiry.travel_dates)}
          ${emailRow('Party size', enquiry.party_size)}
        </table>
        <p style="margin-top:20px;padding:16px;background:#F6F1E7;border-left:3px solid #B5502B;font-style:italic;">
          ${escapeHtml(enquiry.message)}
        </p>
        <p style="margin-top:24px;">If anything above needs correcting, or you'd like to add
        details in the meantime, just reply to this email — it comes straight to our team.</p>
      `,
    }),
  });
}

// --- Sent to a new mailing-list subscriber ---------------------------------

async function sendSubscribeWelcomeEmail(email) {
  const transport = getTransport();
  if (!transport) return;

  await transport.sendMail({
    from: fromAddress(),
    to: email,
    subject: 'Welcome to Muto Tours',
    text: [
      'Thank you for joining the Muto Tours mailing list.',
      '',
      'You’ll hear from us with travel ideas, seasonal guides, and the occasional ' +
        'note on new routes across Zimbabwe, Botswana, Namibia, and South Africa — ' +
        'nothing more frequent than that.',
      '',
      'In the meantime, if you’re already planning a trip, just reply to this email ' +
        'and we’ll help you build it.',
      '',
      'Warm regards,',
      'The Muto Tours Team',
    ].join('\n'),
    html: renderEmail({
      heading: 'Welcome to Muto Tours',
      body: `
        <p>Thank you for joining the Muto Tours mailing list.</p>
        <p>You'll hear from us with travel ideas, seasonal guides, and the occasional note
        on new routes across Zimbabwe, Botswana, Namibia, and South Africa — nothing more
        frequent than that.</p>
        <p style="margin-top:20px;">In the meantime, if you're already planning a trip, just
        reply to this email and we'll help you build it.</p>
      `,
    }),
  });
}

// --- Shared minimal HTML email shell ---------------------------------------

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function emailRow(label, value) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:4px 0;color:#71785C;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;width:220px;">${escapeHtml(label)}</td>
      <td style="padding:4px 0;color:#211D18;font-size:14px;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function renderEmail({ heading, body }) {
  return `
  <div style="background:#FBF8F2;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;">
    <div style="max-width:520px;margin:0 auto;background:#FFFFFF;border:1px solid #21181812;padding:32px;">
      <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#B5502B;margin:0 0 16px;">Muto Tours</p>
      <h1 style="font-size:22px;color:#211D18;margin:0 0 16px;font-weight:normal;font-style:italic;">${escapeHtml(heading)}</h1>
      <div style="color:#211D18;font-size:14px;line-height:1.6;">${body}</div>
      <p style="margin-top:32px;padding-top:16px;border-top:1px solid #21181812;font-size:11px;color:#71785C;">
        Muto Tours &middot; info@mutotours.africa
      </p>
    </div>
  </div>
  `;
}

module.exports = { sendEnquiryEmail, sendEnquiryConfirmationEmail, sendSubscribeWelcomeEmail };

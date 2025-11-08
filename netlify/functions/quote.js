exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const payload = JSON.parse(event.body || '{}');

    const contact = payload.contact || payload.phone || '';
    const required = { name: payload.name, contact, pickup: payload.pickup, dropoff: payload.dropoff, date: payload.date, time: payload.time };
    for (const [k,v] of Object.entries(required)) {
      if (!v) return { statusCode: 400, body: `Missing field: ${k}` };
    }

    const msg =
      `New Ride Request — Guir Transportation\n` +
      `Name: ${payload.name}\n` +
      `Contact: ${contact}\n` +
      `Pickup: ${payload.pickup}\n` +
      `Drop-off: ${payload.dropoff}\n` +
      `Date: ${payload.date}  Time: ${payload.time}\n` +
      (payload.notes ? `Notes: ${payload.notes}\n` : '') +
      `— website`;

    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, SMS_TO } = process.env;

    const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    await twilio.messages.create({ from: TWILIO_FROM, to: SMS_TO, body: msg });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err){
    console.error(err);
    return { statusCode: 500, body: 'Error sending SMS' };
  }
};

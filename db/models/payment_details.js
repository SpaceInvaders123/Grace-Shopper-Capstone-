const client = require("../client");

module.exports = { createPaymentDetails };

async function createPaymentDetails({ amount, status }) {
  try {
    const {
      rows: [paymentDetails],
    } = await client.query(
        `
        INSERT INTO payment_details (amount, status)
        VALUES ($1, $2)
        RETURNING *;
        `,
      [amount, status]
    );

    return paymentDetails;
  } catch (error) {
    throw error;
  }
}
const client = require("../client");

module.exports = {
  createPaymentDetails,
  getAllPaymentDetails,
  destroyPaymentDetails,
  updatePaymentDetails,
};

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

async function getAllPaymentDetails(){
  try {
    const {rows: paymentDetails} = await client.query(`
      SELECT * FROM payment_details;
    `);

    return paymentDetails;
  } catch (error) {
    throw error;
  }
}

async function destroyPaymentDetails(paymentDetailsId){
  try {
    const { rows: [paymentDetails] } = await client.query(`
      DELETE FROM payment_details
      WHERE id=$1
      RETURNING *;
    `,
      [paymentDetailsId]
    );
    return paymentDetails;
  } catch (error) {
    throw error;
  }
}

async function updatePaymentDetails({ amount, status }){
  try {
    const {
      rows: [paymentDetails],
    } = await client.query(`
      UPDATE payment_details
      SET amount=$1, status=$2
      WHERE id=$3
      RETURNING *;
    `,
      [amount, status, id]
    );
    return paymentDetails;
  } catch (error) {
    throw error;
  }
}
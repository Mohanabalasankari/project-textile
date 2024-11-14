const braintree = require('braintree');

// Initialize Braintree Gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // Change to Production for live
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Generate Braintree client token
const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        console.error("Braintree Token Error:", err);
        return res.status(500).send({ error: err });
      }
      res.send(response);
    });
  } catch (error) {
    console.log("Braintree Token Generation Failed:", error);
    res.status(500).send({ error: error.message });
  }
};


// Handle Braintree payment
const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

// Export controllers using CommonJS
module.exports = {
  braintreeTokenController,
  brainTreePaymentController,
};

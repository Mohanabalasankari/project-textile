const express = require('express');
const router = express.Router();
const { brainTreePaymentController, braintreeTokenController } = require('../controllers/checkoutController');

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", brainTreePaymentController);

module.exports = router;

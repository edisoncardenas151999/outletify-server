const express = require("express");
const { route } = require(".");
const router = express.Router();
const Stripe = require("stripe")(process.env.SECRET_KEY);

router.post("/payment", async (req, res, next) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });
    status = "success";
  } catch (error) {
    console.log(error);
    status = "fail";
  }
  res.json({ error, status });
});

module.exports = router;

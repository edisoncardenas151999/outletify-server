const express = require("express");
const router = express.Router();
const Item = require("../models/Item.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

//TODO make a post request to stripe and get the total amount
// from req.body

module.exports = router;

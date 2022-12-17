require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();
require("./config")(app);

// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const itemRouter = require("./routes/item");
app.use("/auth", itemRouter);

const userRouter = require("./routes/user");
app.use("/auth", userRouter);

const sellRouter = require("./routes/sell");
app.use("/auth", sellRouter);

const paymentRouter = require("./routes/payment");
app.use("/auth", paymentRouter);

const ratingtRouter = require("./routes/rating");
app.use("/auth", ratingtRouter);

require("./error-handling")(app);

module.exports = app;

const express = require("express");
const morgan = require("morgan");
const accountRoutes = require("./Routes/accountRoutes");
const profileRoutes = require("./Routes/profileRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

module.exports = app;

app.use('/account', accountRoutes);
app.use('/profile', profileRoutes);


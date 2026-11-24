const express = require("express");
const morgan = require("morgan");
const userRouter = require('./Routes/userRoutes');
const gameRouter = require('./Routes/gameRoutes');
const accountRoutes = require("./Routes/accountRoutes");
const profileRoutes = require("./Routes/profileRoutes");

const notFoundHandler = require("./Middelware/notFoundHandler")
const errorHandler = require("./Middelware/errorHandler")

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/games', gameRouter);

app.use(express.static("public/static"))
app.use(express.static("public"));

app.use('/account', accountRoutes);
app.use('/profile', profileRoutes);


app.use(notFoundHandler)
app.use(errorHandler);

module.exports = app;

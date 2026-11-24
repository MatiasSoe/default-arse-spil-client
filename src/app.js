const express = require("express");
const morgan = require("morgan");
const userRouter = require('./Routes/userRoutes');
const gameRouter = require('./Routes/gameRoutes');

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/games', gameRouter);

module.exports = app;




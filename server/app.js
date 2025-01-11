const express = require('express');
const app = express();

const authRouter = require('./controllers/authController');
const chatRouter = require('./controllers/chatController');
const userRouter = require('./controllers/userController');

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);
app.use('/api/user', userRouter);

module.exports = app;
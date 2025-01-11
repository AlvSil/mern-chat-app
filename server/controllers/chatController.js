const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
const Chat = require('../models/chat');

router.post('/create-new-chat', authMiddleware, async(req, res) => {
    try {
        const chat = new Chat(req.body);
        const savedChat = await chat.save();

        return res.status(201).send({
            message: 'Chat created successfuly!',
            success: true,
            data: savedChat
        });
    }
    catch(error) {
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
});

module.exports = router;
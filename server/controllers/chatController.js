const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
const ChatModel = require('../models/chat');

router.post('/create-new-chat', authMiddleware, async(req, res) => {
    try {
        const chat = new ChatModel(req.body);
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

router.get('/get-all-chats', authMiddleware, async(req, res) => {
    try {
        const allChats = await ChatModel.find({members: { $in: req.body.userId }});
        if (allChats) {
            res.status(200).send({
                message: 'all chats fetched successfully',
                success: true,
                data: allChats
            });
        }
    }
    catch(error) {
        res.status(400).send({
            message: 'failed to fetch all chats',
            success: false
        });
    }
});

module.exports = router;
const router = require('express').Router();
const UserModel = require('./../models/user');
const authMiddleware = require('./../middlewares/authMiddleware');

router.get('/get-logged-user', authMiddleware, async(req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.body.userId });
        if (user) {
            res.send({
                message: 'user fetched successfully',
                success: true,
                data: user
            });
        }
    }
    catch(error) {
        res.status(400).send({
            message: 'failed to fetch user',
            success: false
        });
    }
});

router.get('/get-all-users', authMiddleware, async(req, res) => {
    try {
        const allUsers = await UserModel.find({_id: { $ne: req.body.userId }});
        if (allUsers) {
            res.send({
                message: 'all users fetched successfully',
                success: true,
                data: allUsers
            });
        }
    }
    catch(error) {
        res.status(400).send({
            message: 'failed to fetch all users',
            success: false
        });
    }
});

module.exports = router;
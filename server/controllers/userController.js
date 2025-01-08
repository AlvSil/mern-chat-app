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
        res.send({
            message: 'failed to fetch user',
            success: false
        });
    }
});

module.exports = router;
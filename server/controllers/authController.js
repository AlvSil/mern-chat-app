const bcrypt = require('bcryptjs');
const router = require('express').Router();
const UserModel = require('../models/user');

router.post('/signup', async(req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (user) {
            // just for fun purposes
            // in reality we should not return any error in this case
            // we should make the request fail and send an email to the user notifying them that someone has tried to create an account using their email
            return res.send({
                message: 'User already exists.',
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = new UserModel(req.body);
        await newUser.save();

        return res.send({
            message: 'User created successfuly!',
            success: true
        });
    }
    catch(error) {
        res.send({
            message: error.message,
            status: false
        });
    }
});

module.exports = router;
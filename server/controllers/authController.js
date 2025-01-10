const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

router.post('/signup', async(req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (user) {
            // just for fun purposes
            // in reality we should not return any error in this case
            // we should make the request fail and send an email to the user notifying them that someone has tried to create an account using their email
            return res.status(400).send({
                message: 'User already exists.',
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = new UserModel(req.body);
        await newUser.save();

        return res.status(201).send({
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

router.post('/login', async(req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({
                message: 'user does not exists',
                success: false,
            });
        }

        const userPassword = user.password;
        const isPasswordCorrect = await bcrypt.compare(req.body.password, userPassword);
        if (!isPasswordCorrect) {
            return res.status(400).send({
                message: 'Invalid email or password',
                success: false,
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
        res.send({
            message: 'user logged in successfully',
            success: true,
            token: token,
        });
    }
    catch(error) {
        res.status(400).send({
            message: error.message,
            success:false,
        });
    }
});

module.exports = router;
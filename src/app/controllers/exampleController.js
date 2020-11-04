const express = require('express');
const authMiddleware = require('../middlewares/auth');

const User = require('../models/user');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    const users = await User.find();
    return res.send({ users });
});

module.exports = app => app.use('/example', router);
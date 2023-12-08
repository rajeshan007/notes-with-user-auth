const User = require('../models/user-model')
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const _ = require("lodash")
const usersCtlr = {}

usersCtlr.register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() })
        } else {
            const body = _.pick(req.body, ["userName", "email", "password"])
            const user = new User(body)
            const salt = await bcryptjs.genSalt()
            const hashedPassword = await bcryptjs.hash(user.password, salt)
            user.password = hashedPassword
            await user.save()
            res.json(user)
        }

    } catch (e) {
        res.json(e)
    }
}

usersCtlr.login = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        } else {
            const body = _.pick(req.body, ['email', 'password'])
            const user = await User.findOne({ email: body.email })
            if (user) {
                const result = await bcryptjs.compare(body.password, user.password)
                if (result) {
                    const tokenData = { id: user._id }
                    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d' })
                    res.json({ token: token })

                } else {
                    res.status(404).json({ error: 'invalid email / password' })
                }
            } else {
                res.status(404).json({ error: 'invalid email / password' })
            }
        }
    } catch (e) {
        res.json(e)
    }
}

usersCtlr.account = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const resBody = _.pick(user, ["_id", "userName", "email"])
        res.json(resBody)
    } catch (e) {
        res.json(e)
    }
}

module.exports = usersCtlr

/*
{
  _id: new ObjectId("654bc5d861ca7ba854b1ddcb"),
  userName: 'user1',
  email: 'user1@gmail.com',
  password: '$2a$10$Zglqjr00vXXB7pGEmisxY.xgRVaA0pDDWwCu/bz4Ep.pQupPO7oxe',
  createdAt: 2023-11-08T17:31:04.989Z,
  updatedAt: 2023-11-08T17:31:04.989Z,
  __v: 0
}
*/

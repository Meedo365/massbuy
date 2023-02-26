const jwt = require('jsonwebtoken');
const User = require("../../models/user");

const isAdmin = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1]
        if (!token) return res.status(400).json({ msg: "Invalid Authentication....." })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) return res.status(400).json({ msg: "Invalid Authentication." })
            let user_ = await User.findOne({ _id: user.id })
            if (user_.role === "admin") {
                req.user = user
                next()
            }
            else {
                return res.status(400).json({ msg: "User Not Authorised." })
            }
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
};

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1]
        if (!token) return res.status(400).json({ msg: "Invalid Authentication....." })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Invalid Authentication." })
            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({ msg: "No Token Found !!!" })
    }
}

module.exports = { isAdmin, auth };
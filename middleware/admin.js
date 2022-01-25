const admin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "You are not an Admin" })
    }
    next()
}

module.exports = admin;

const express = require("express");
const { User, validateUser } = require("../models/user");
const mongoose = require("mongoose");

const router = express.Router()

router.get("/", async (req, res) => {
    const users = await User.find()
    res.json(users)
})
router.get("/:id", async (req, res) => {

    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "no user with the given id" })

    res.json(user)
})

router.put("/:id", async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "no user with the given id" })

    const { error } = validateUser(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })


    user.set(req.body)

    await user.save();
    res.json(user)
})
router.delete("/:id", async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "no user with the given id" })

    await User.findByIdAndDelete(req.params.id);
    const users = await User.find()
    res.json(users)
})

module.exports = router


// const express = require("express");
// const { User, validateUser } = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const router = express.Router();


// router.put("/:id", async (req, res) => {
//     console.log(req.user);
//     if (req.user.isAdmin) {
//         const Plan = await plan.findById(req.params.id);
//         Plan.name = req.body.name;
//         await Plan.save();
//         res.json(Plan)
//     }
// })



const express = require("express");
const { Plan, validatePlan } = require("../models/Plan");
const mongoose = require("mongoose");
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const jwt = require("jsonwebtoken");
const router = express.Router()
router.get("/", auth, async (req, res) => {
    const plans = await Plan.find()
        .populate("users", "email ")
    res.json(plans)
})

router.get("/:id", [auth, admin], async (req, res) => {

    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "no Plan with the given id" })
    res.json(plan)
})
router.put("/:id", [auth, admin], async (req, res) => {
    const token = req.header("x-auth-token");
    if (jwt.verify(token, process.env.SECRET_KEY)) {
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!isValidId) return res.status(400).json({ message: "invalid id" })
        const plan = await Plan.findById(req.params.id);
        if (!plan) return res.status(404).json({ message: "no user with the given id" })
        const { error } = validateUser(req.body)
        if (error) return res.status(400).json({ message: error.details[0].message })
        plan.set(req.body)
        await plan.save();
        res.json(plan)
    }
})
router.post("/create", [auth, admin], async (req, res) => {

    const token = req.header("x-auth-token");

    if (jwt.verify(token, process.env.SECRET_KEY)) {
        const { error } = validatePlan(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        try {
            const newPlan = new Plan(req.body)
            // const result = await newPlan.save()
            await newPlan.save()
            const plans = await Plan.find()
                .populate("users", "name email -_id")
            res.json(plans)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
});

router.delete("/:id", [auth, admin], async (req, res) => {

    const token = req.header("x-auth-token");

    if (jwt.verify(token, process.env.SECRET_KEY)) {
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!isValidId) return res.status(400).json({ message: "invalid id" })
        const plan = await Plan.findById(req.params.id);
        if (!plan) return res.status(404).json({ message: "no user with the given id" })
        const result = await Plan.findByIdAndDelete(req.params.id);
        res.json(result)
    }
})

module.exports = router

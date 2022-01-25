const express = require("express")
const { Plan } = require("../models/Plan");
const mongoose = require("mongoose");
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const jwt = require("jsonwebtoken");

const router = express.Router();
router.post("/sub/:id/userid", async (req, res) => {

    let plan = await Plan.findById(req.params.id);
    plan.user.push(req.body.userid);
    await plan.save();
    res.json(plan)
})

module.exports = router;
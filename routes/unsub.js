const express = require("express")
const { Plan } = require("../models/Plan")

const router = express.Router();
router.put("/unsub/:id", async (req, res) => {

    let plan = await Plan.findById(req.params.id);
    let un = plan.user.filter((uid) => {
        if (uid != req.body.id) {
            return uid;
        }
    })
    plan.user = un;
    await plan.save();
    res.json(plan)
})

module.exports = router;
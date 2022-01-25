// require("express-async-errors");
// require("dotenv").config({ path: "./.env" })
// const express = require("express");
// const mongoose = require("mongoose");
// const authRouter = require("./routes/auth");
// const auth = require("./middleware/auth");
// const subs = require("./routes/sub")
// const unsubs = require("./routes/unsub")
// const plan = require("./routes/plan")

// mongoose.Promise = global.Promise;


// const app = express();

// //middleware
// app.use(express.json());
// app.use("/api/auth", authRouter);
// app.use("/sub/:id", subs)
// app.use("/unsub/:id", unsubs)

// // app.use("/plans", plansRouter)

// // app.use("/plans", auth, plansRouter)

// const errorHandler = (func) => {
//     return (req, res, next) => {
//         try {
//             func(req, res, next)
//         } catch (error) {
//             next(error)
//         }
//     }
// }


// app.get("/", errorHandler((req, res) => {
//     // throw new Error("un-expected-error")
//     console.log(req.user);
//     if (req.user.isAdmin)
//         return res.json({ message: "hello-world" })
//     res.status(401).json({ message: "must be admin" })
// }))


// //Error handling middleware
// app.use((err, req, res, next) => {
//     res.status(500).json({ message: err.message })
// })

// mongoose.connect(process.env.MONGO_URL).then(() => {
//     console.log("successfully connected to database");
//     app.listen(3000, () => {
//         console.log("listening on port 3000");
//     })
// }).catch(e => console.log(e.message))
require("express-async-errors");
require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const express = require("express");
const planRouter = require("./routes/plan")
const authRouter = require("./routes/auth")
const subs = require("./routes/sub")
const unsubs = require("./routes/unsub")
const user = require("./routes/user")

const app = express();

// middleware
app.use(express.json());
// Make server use routers
app.use("/plan", planRouter)
app.use("/api/auth", authRouter)
app.use("/sub/:id", subs)
app.use("/unsub/:id", unsubs)
app.use("/user", user)

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
})
mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
        console.log("successfully connected to mongodb");
        // start backend erver
        app.listen(3000, () => {
            console.log("Server listeing on port 3000");
        });
    })
    .catch((e) => {
        console.log(e.message);
    });


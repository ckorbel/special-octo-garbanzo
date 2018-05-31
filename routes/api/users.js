const express = require("express");
const router = express.Router();

//app.use("/api/users", users); the , users tells the route to go here and get /test
//@route GET request to api/post/test
//@description Tests post route
//@access public route
router.get("/test", (req, res) => res.json({ message: "Users works" }));

module.exports = router;

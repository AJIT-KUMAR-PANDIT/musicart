
const express = require("express");

const { register, login, getUser } = require("../controllers/authController");
const { authCheck } = require("../middleware/authCheck");

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
// router.get("/getuser", getUser);

module.exports = router;

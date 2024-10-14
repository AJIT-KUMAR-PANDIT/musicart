const express = require("express");
const { takeFeedback } = require("../controllers/feedbackController");

const router = express.Router();

router.post("/takefeedback", takeFeedback);

module.exports = router;

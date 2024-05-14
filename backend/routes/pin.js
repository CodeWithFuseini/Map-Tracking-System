const express = require("express");
const router = express.Router();

const { addPin, getPins, removePin } = require("../controllers/pinController")

router
.post("/", addPin)
.get("/", getPins)
.delete("/:id", )



module.exports = router
const express = require('express');
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const corsOptions = require("./config/corsOptions");

const app = express()
const port = 4000

require("dotenv").config();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(cors(corsOptions))
app.use("/api/pin", require("./routes/pin"));
app.use("/api/user", require("./routes/user"));

app.use(errorHandler)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
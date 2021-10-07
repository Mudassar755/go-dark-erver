// const express = require("express");
// const app = express();
// const product = require("./api/product");
// const auth = require("./api/auth");

// app.use(express.json({ extended: false }));

// app.use("/api/product", product);
// app.use("/api/auth", auth);

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
const express = require('express')
const auth = require("./api/auth")
const mail = require("./api/mail")
var useragent = require('express-useragent');
const connectDB = require('./config/db');
var cors = require("cors");
var helmet = require('helmet')
// const dotenv = require("dotenv");

// dotenv.config();

const app = express();
app.use(helmet())
//Connect MongoDB
connectDB();

var whitelist = ['http://localhost:3000']
var corsOptions = {
    origin: function (origin, callback) {
        // console.log("originn", origin)
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(useragent.express());
app.use(helmet.hidePoweredBy())
app.use(cors(corsOptions));
app.use(express.json({extended: false}))

app.use("/api/auth", auth)
app.use("/api/mail", mail)
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server is up and running on the port ${PORT}`));
const express = require("express");
//const dotenv = require("dotenv").config();
const fs = require("fs");
const bodyparser = require("body-parser");
const path = require("path");
const cookieparser = require("cookie-parser");
global.__basedir = __dirname;

const mainRoutes = require("./routes/main-routes");

const app = express();
// NPM Package used to initialize session
//const session = require("express-session")
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware that uses body-parser or multer to parse the key-value pairs from the incoming request
app.use(bodyparser.urlencoded({extended: false}));

// To expose the files in the "public" folder and grant the READ access to stylesheets, media and scripts
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieparser());

// Main path
app.use("/", mainRoutes);

// Catch exceptions
process.on("uncaughtException", (error) => {
    console.log("UncaughtException:" + " " + error.message);
    console.error(error.stack);
    // Exit the process in case of an error
    process.exit(1)
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});




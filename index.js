const express = require("express");
const path = require("path");

// Create the server
const app = express();

if (process.env.NODE_ENV === "production") {
    // Express will serve up production assets
    app.use(express.static("build"));
    app.get("*", (req, res) => res.sendFile(path.resolve("build", "index.html")));
}
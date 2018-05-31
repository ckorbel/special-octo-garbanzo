const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("Hello"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

//run server with node FILENAME in this instance node server or noder server.js

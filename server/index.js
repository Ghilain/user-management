const express = require("express");
const app = express();
const cors = require("cors");

//Middleware

app.use(express.json()); // help for req.boy
app.use(cors());

//Routes//

// routes for registration and login

app.use("/auth", require("./routes/userAuth"));

app.listen(5000, () => {
    console.log("server running on port 5000");
});

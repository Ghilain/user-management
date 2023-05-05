const express = require("express");
const app = express();
const cors = require("cors");

//Middleware

app.use(express.json()); // help for req.boy
app.use(cors());

//Routes//

app.listen(5000, () => {
    console.log("server running on port 5000");
});

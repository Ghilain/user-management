const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(id){
    const payload ={
        user: id
    }

    jwt.sign(payload, process.env.userSecret, {expiresIn: "1hr"})
}

module.exports = jwtGenerator;

const router = require("express").Router();
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const bcrypt = require("../utils/jwtGenerator");

// Route for registration

router.post("/signup", async (req, res) => {
  try {

    // destructure the red.body
    const { email, password, firstname, lastname, gender, age, dob, marital_status, nationality } = req.body;

    // Check if user with the same email already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User with the same email already exists' });
    }

    // Hash password
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // Insert new user into database
    const newUser = await pool.query(
      'INSERT INTO users (email, password, firstname, lastname, gender, age, dob, marital_status, nationality) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [email, hashedPassword, firstname, lastname, gender, age, dob, marital_status, nationality]
    );

    // Generate JWT token
    const token = jwtGenerator(newUser.rows[0].id);

    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});

// Route for login

router.post("/login", async (req, res) => {
  try {
    // Destruct the req.body

    const{ email, password } = req.body;

    // Check if user doesn't exist

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    if (user.rows.length === 0){
      return res.status(401).json("Password or Email is incorrect");
    }

    // Check if entered password is correct as it is in database

    const validPassword = await bcrypt.
    compare(
      password,
      user.rows[0].password
    );

    if (!validPassword){
      return res.status(401).json
      ("Password or Email is incorrect");
    }



  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;

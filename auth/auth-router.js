const router = require('express').Router();
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
//contains the secret
const config = require("../api/config");
const { isValid } = require('../users/users-service')
const Users = require('../users/users-model')



router.post('/register', (req, res) => {
  // implement registration
  if (isValid(req.body)) {
    const hash = bcryptjs.hashSync(req.body.password, 8)
    req.body.password = hash
    Users.add(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username })
      .then(([user]) => {
        console.log("findby", user)
        // compare the password the hash stored in the database
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = getJwt(user);

          res.status(200).json({ message: "Welcome to our API", token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

function getJwt(user) {
  const payload = {
    username: user.username,
  };

  const jwtOptions = {
    expiresIn: "8h",
  };

  return jwt.sign(payload, config.jwtSecret, jwtOptions);
}

module.exports = router;

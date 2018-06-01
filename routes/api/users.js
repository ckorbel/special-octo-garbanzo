const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//Load User Model
const User = require("../../models/User");

//app.use("/api/users", users); the , users tells the route to go here and get /test
//@route GET request to api/post/test
//@description Tests post route
//@access public route
router.get("/test", (req, res) => res.json({ message: "Users works" }));

//route    GET api/users/register
//desc     Register user
//access   public

router.post("/register", (req, res) => {
  //first check is user already exits
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      console.log(req);
      return res.status(400).json({ email: "email already exits" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar, //since these are the same es6 lets you do just avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//route     GET api/users/login
//desc      Login in user /return JSON web token
//access    Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //find the user by email
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched

        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }; //create JWT payload

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        ); //see json web token docs
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;

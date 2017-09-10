const express = require('express');
const loginRouter = express.Router();
const models = require("../models");

loginRouter.get("/", function (req, res) {
    res.render('login');
});

//from robot directory
//user routes

// userRoutes.get("/profile", (req, res) => {
//     res.render("profile", { users: req.session.user });
//   });


// profile routes 

// const express = require("express");
// const profileRoutes = express.Router();
// const Robot = require("../models/Robot");
// const bcrypt = require("bcryptjs");

// //this is what goes to the individual profiles - it's working
// profileRoutes.get("/:id", (req, res) => {

//     Robot.findById(req.params.id).then(foundRobot => {
//         if (!foundRobot) {
//             res.status(500).send(err);
//         }
//         res.render("profile", { users: foundRobot });
//     });
// });



loginRouter.post("/", function (req, res) {

    models.user
        .findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        }).then(function (user) {
            if (user) {
                // console.log('user: ', user);
                req.session.user = {
                    username: user.username,
                    firstname: user.firstname,
                    userId: user.id
                }
                res.redirect("/");
            } else {
                // console.log("USER NOT FOUND");
                return res.redirect("/login");
            }
        });
});

module.exports = loginRouter;
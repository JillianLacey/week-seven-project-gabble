const express = require('express');
const loginRouter = express.Router();
const models = require("../models");

loginRouter.get("/", function (req, res) {
    res.render('login');
});

loginRouter.post("/", function (req, res) {

    models.user
        .findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        }).then(function (user) {
            if (user) {
                console.log('user: ', user);
                req.session.user = {
                    username: user.username,
                    firstname: user.firstname,
                    userId: user.id
                }
                res.redirect("/");
            } else {
                console.log("USER NOT FOUND");
                return res.redirect("/login");
            }
        });
});

module.exports = loginRouter;
const express = require('express');
const postsRouter = express.Router();
const shared = require('../public/sharedFunctions.js');
const models = require("../models");

postsRouter.get("/", shared.checkAuth, function (req, res) {
    res.render('post', { user: req.session.user });
});

postsRouter.post("/", function (req, res) {
    if (!req.body || !req.body.newmessage) {
        res.redirect("/");
    }

    var newMessage = models.post.build({
        message: req.body.newmessage,
        userId: req.session.user.userId
    });
    newMessage
        .save()
        .then(function (savedMessage) {
            res.redirect("/");
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

module.exports = postsRouter;
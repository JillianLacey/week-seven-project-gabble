const express = require('express');
const mypostsRouter = express.Router();
const shared = require('../public/sharedFunctions.js');
const models = require("../models");

mypostsRouter.get("/", shared.checkAuth, function (req, res) {
    models.post
        .findAll({
            where: { userId: req.session.user.userId },
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: models.user,
                    as: "user"
                },
                {
                    model: models.like,
                    as: "likes",
                    include: {
                        model: models.user,
                        as: "user"
                    }
                }
            ]
        })
        .then(function (foundMessages) {
            console.log(foundMessages);
            res.render("myposts", {
                posts: foundMessages,
                user: req.session.user
            });
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

mypostsRouter.post("/:id", shared.checkAuth, function (req, res) {
    models.like
        .destroy({
            where: {
                postId: req.params.id
            }
        })
        .then(function () {
            models.post
                .destroy({
                    where: {
                        id: req.params.id
                    }
                })
        })
        .then(function () {
            res.redirect("/myposts");
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

module.exports = mypostsRouter;
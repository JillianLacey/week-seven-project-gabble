const express = require('express');
const indexRouter = express.Router();
const shared = require('../public/sharedFunctions.js');
const models = require("../models");

indexRouter.get("/", shared.checkAuth, function (req, res) {
    models.post
        .findAll({
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
            // console.log(foundMessages);
            res.render("index", {
                messages: foundMessages,
                user: req.session.user
            });
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});



module.exports = indexRouter;
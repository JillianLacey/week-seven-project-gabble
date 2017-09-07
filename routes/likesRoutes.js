const express = require('express');
const likesRouter = express.Router();
const models = require("../models");

likesRouter.post("/:id", function (req, res) {
    // SELECT 
    models.post
        .findOne({
            where: { id: req.params.id },
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
        .then(function (foundLikes) {
            // console.log(foundLikes);
            res.render("likes", {
                messages: foundLikes,
                user: req.session.user
            });
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

module.exports = likesRouter;
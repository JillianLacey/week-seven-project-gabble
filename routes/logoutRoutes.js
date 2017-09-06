const express = require('express');
const logoutRouter = express.Router();

logoutRouter.get("/", function (req, res) {
    req.session.destroy();
    res.redirect("/login");
});

module.exports = logoutRouter;
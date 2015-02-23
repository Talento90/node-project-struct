"use strict";

var express = require('express'),
auth = rRequire('libs/authentication'),
router = express.Router(),


module.exports = function (app) {
  app.use('/api/users', router);
};

/*Get an user info*/
router.get('/info', auth.isAuthenticated, function (req, res, next) {
    res.send(req.user.getViewModel());
});

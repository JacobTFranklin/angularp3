var db = require('../models/');
var jwt = require('express-jwt');
var jwksRsa = require('jwks-rsa');

module.exports = function (app) {

    const checkJwt = jwt({
        // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
        secret: jwksRsa.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `https://dev-yz09wjvb.auth0.com/.well-known/jwks.json`
        }),
        // // Validate the audience and the issuer.
        // audience: process.env.AUTH0_AUDIENCE,
        // issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ['RS256']
    });

    app.get("/api/stats/other", checkJwt, function (req, res) {
        console.log("req="+req);
        db.Stat.findAll({
            where: {
                uid: req.query.uid
            }
        }).then(function (dbStats) {
            res.json(dbStats);
        });
    });

    app.get("/api/stats", checkJwt, function (req, res) {
        db.Stat.findAll({
            where: {
                UserEmail: req.query.email
            }
        }).then(function (dbStats) {
            res.json(dbStats);
        });
    });

    app.get("/api/stats/sum", checkJwt, function (req, res) {
        console.log("req="+req);
        db.Stat.sum('minutes', {
            where: {
                UserEmail: req.user.email
            }
        })
            .then(function (dbStats) {
                res.json(dbStats);
            });
    });

    app.get("/api/stats/team/sum", checkJwt, function (req, res) {
        db.Stat.sequelize.query("SELECT SUM(minutes) as minutes FROM Stats join Users on Users.email = Stats.UserEmail WHERE Users.team ='" + req.query.user + "'").spread((results, metadata) => {
            res.json(metadata);
        });
    });


    app.get("/api/stats/weekly", checkJwt, function (req, res) {
        db.Stat.sequelize.query("SELECT SUM(minutes) as minutes FROM Stats WHERE UserEmail='" + req.user.email + "' and date >= CAST(DATE_ADD(CURDATE(), INTERVAL (1 - DAYOFWEEK(CURDATE())) DAY) AS date)").spread((results, metadata) => {
            res.json(metadata);
        });
    });

    app.get("/api/stats/team/weekly", checkJwt, function (req, res) {
        db.Stat.sequelize.query("SELECT SUM(minutes) as minutes FROM Stats join Users on Users.email = Stats.UserEmail WHERE Users.team = '" + req.query.user + "' and date >= CAST(DATE_ADD(CURDATE(), INTERVAL (1 - DAYOFWEEK(CURDATE())) DAY) AS date)").spread((results, metadata) => {
            res.json(metadata);
        });
    });

    app.get("/api/rank", checkJwt, function (req, res) {
        db.Stat.sequelize.query("SELECT RANK() OVER (ORDER BY sum(minutes)) my_rank FROM Stats WHERE UserEmail = '" + req.user.email + "' GROUP BY UserEmail").spread((results, metadata) => {
            res.json(metadata);
        });
    });

    app.get("/api/rank/team", checkJwt, function (req, res) {
        db.Stat.sequelize.query("SELECT RANK() OVER (ORDER BY sum(minutes)) team_rank FROM Stats join obt9xbdqx4wuo9hj.Users on Users.email = Stats.UserEmail WHERE team = '" + req.query.user + "' GROUP BY Users.team").spread((results, metadata) => {
            res.json(metadata);
        });
    });

    app.get("/api/users", checkJwt, function (req, res) {
        db.User.findOne({
            where: {
                email: req.user.email
            }
        }).then(function (dbUsers) {
            res.json(dbUsers);
        });
    });

    app.get("/api/users/other", checkJwt, function (req, res) {
        db.User.findOne({
            where: {
                uid: req.query.user
            }
        }).then(function (dbUsers) {
            res.json(dbUsers);
        });
    });


    app.get("/api/users/team", function (req, res) {
        db.User.findAll({
            where: {
                team: req.query.user
            }
        }).then(function (dbUsers) {
            res.json(dbUsers);
        });
    });

    app.post("/api/stats", function (req, res) {
        db.Stat.create(req.body).then(function (dbStats) {
            res.json(dbStats);
        });
    });

    app.delete("/api/stats", checkJwt, function (req, res) {
        db.Stat.destroy({
            where: {
                id: req.query.stat
            }
        }).then(function (dbStats) {
            res.json(dbStats);
        });
    });

};

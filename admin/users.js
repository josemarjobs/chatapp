var _ = require("lodash");
var express = require("express");
var os = require('os');

var User = require('../data/chatDB').User;

var router = express.Router();
module.exports = router;

router.get('/:alias?', function (req, res, next) {
  var query = {};
  if (req.query.alias) {
    query = {alias: new RegExp(req.query.alias)};
  }
  User.find(query).exec()
  .then(users => {
    res.render("users/list", {
      title: "Admin Users",
      users: users,
      alias: req.query.alias
    });
  }).catch(next)
});

router.route('/add')
  .get(function (req, res) {
    res.render("users/add");
  })
  .post(function (req, res, next) {
    var user = new User();
    userFromRequestBody(user, req);
    user.save().then(() => res.redirect(req.baseUrl))
    .catch(err => {
      if (err.name === "ValidationError") {
        return res.render('users/add', {
          user: user,
          errors: err.errors
        });
      }
      next(err);
    });
  });

function userFromRequestBody(user, request) {
  user.alias = request.body.alias;
  user.roles = request.body.roles;
  user.contact = {
    phone: request.body["contact.phone"],
    email: request.body["contact.email"]
  };
  user.address = {
    lines: request.body["address.lines"].split(os.EOL),
    city: request.body["address.city"],
    state: request.body["address.state"],
    zip: request.body["address.zip"]
  };
}

router.route('/edit/:id')
  .all(function (req, res, next) {
    User.findById(req.params.id).exec()
    .then(user => {
      if (!user) {
        res.sendStatus(404);
        return;
      }
      res.locals.user = user;
      res.locals.userHasRole = function (role) {
        return (user.roles || []).indexOf(role) > -1
      };
      next()
    }).catch(next)
  })
  .get(function (req, res) {
    res.render("users/edit");
  })
  .post(function (req, res, next) {
    userFromRequestBody(res.locals.user, req);
    res.locals.user.save().then(()=>res.redirect(req.baseUrl))
    .catch(err => {
      if (err.name === "ValidationError") {
        res.render('users/edit', {
          errors: err.errors
        })
        return;
      }
      next(err);
    });
  });

router.get('/delete/:id', function (req, res) {
  User.remove({_id: req.params.id})
  .then(() => res.redirect(req.baseUrl));
});

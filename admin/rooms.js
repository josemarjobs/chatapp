var uuid = require("node-uuid");
var _ = require("lodash");
var express = require("express");
var connect = require('../data/chatDB').connect;
var ObjectId = require('mongodb').ObjectId;
var co = require('co');
var wrap = require('co-express');

var router = express.Router();
module.exports = router;

router.get('/', wrap(function* (req, res) {

  var db = yield connect;
  var rooms = yield db.collection('rooms').find().toArray()
  res.render('rooms/list', {title: "Admin Rooms", rooms: rooms})

}));

router.route('/add')
  .get(function (req, res) {
    res.render("rooms/add");
  })
  .post(wrap(function* (req, res) {
    var room = {
      name: req.body.name
    };

    var db = yield connect;
    var result = yield db.collection('rooms').insertOne(room)
    res.redirect(req.baseUrl)

  }));

router.route('/edit/:id')
  .all(wrap(function* (req, res, next) {
    var query = {_id: new ObjectId(req.params.id)};
    var db = yield connect;
    var room = yield db.collection('rooms').findOne(query)
    if (!room) {return res.sendStatus(404);}
    res.locals.room = room;
    next()
  }))
  .get(function (req, res) {
    res.render("rooms/edit");
  })
  .post(wrap(function* (req, res) {
    var query = {_id: new ObjectId(req.params.id)};
    var newRoom = {name: req.body.name};
    var db = yield connect;
    var result = yield db.collection('rooms').updateOne(query, {$set: newRoom})
    res.redirect(req.baseUrl)
  }));

router.get('/delete/:id', wrap(function* (req, res) {
  var filter = {_id: new ObjectId(req.params.id)};
  var db = yield connect;
  var result = yield db.collection('rooms').deleteOne(filter)
  res.redirect(req.baseUrl)
}));

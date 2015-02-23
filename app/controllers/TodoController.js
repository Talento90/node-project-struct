"use strict";

var express = require('express'),
passport = require('passport'),
router = express.Router(),
mongoose = require('mongoose'),
auth = rRequire('libs/authentication'),
Todo = mongoose.model('Todo'),
ctrlHelpers = rRequire('app/utils/ctrlHelpers'),
handleHttpCodeError = ctrlHelpers.handleHttpCodeError,
createError = ctrlHelpers.createError;


var convertReqToTodo = function(req) {
  var todo = new Todo({
    guideId: req.body.guideId,
    name: req.body.name,
    country: req.body.country,
    description: req.body.description,
    places: req.body.places,
    locations: req.body.locations
  });

  return todo;
}

module.exports = function (app) {
  app.use('/api/todo', router);
};

/*Get todos by filters (top, skip, sort)*/
router.get('/', function (req, res, next) {

  var paginate = ctrlHelpers.paginate(req);

  Todo.find().skip(paginate.skip).limit(paginate.top).sort(paginate.sort).exec(function (err, todos) {
    if (err) return next(handleHttpCodeError(err));
    res.send(todos);
  });
});

/*Get a todo by id*/
router.get('/:id', function (req, res, next) {
  var id = req.params.id;

  if(!ctrlHelpers.isValidId(id)){
    return next(createError(400, 'Invalid Id'));
  }

  Todo.findById(id, function (err, todo) {
    if (err) return next(handleHttpCodeError(err));

    if(todo){
      res.send(todo);
    }else{
      res.status(404).send(todo);
    }
  });
});

/*Create a todo*/
router.post('/', auth.isAuthenticated, function (req, res, next) {
  var todo = convertReqToTour(req);
  todo.save(function(err, todo){
    if (err) return next(handleHttpCodeError(err));
      res.status(201).send(todo);
  });
});

/*Update a todo*/
router.put('/:id', function (req, res, next) {
  var id = req.params.id;

  if(!ctrlHelpers.isValidId(id)){
    return next(createError(400, 'Invalid userId'));
  }

  Tour.findById(id, function(err, todo){
    if (err) return next(handleHttpCodeError(err));
    if(!todo){
      res.status(404).send(todo);
    }
    else {
      ctrlHelpers.bindModelToObj(todo, req.body);
      todo.save(function(err, todo){
        if (err) return next(handleHttpCodeError(err));
        res.send(todo);
      });
    }
  });
});

/*Remove a todo*/
router.delete('/:id', function (req, res, next) {
  var id = req.params.id;

  if(!ctrlHelpers.isValidId(id)){
    return next(createError(400, 'Invalid id'));
  }

  Tour.findById(id, function(err, todo){
    if (err) return next(handleHttpCodeError(err));
    if(!todo){
      res.status(404).send(todo);
    }
    else {
      todo.remove(function(err){
        if (err) return next(handleHttpCodeError(err));
        res.send(todo);
      });
    }
  });
});

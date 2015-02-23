"use strict";

module.exports.handleHttpCodeError = function(err) {
  if(err.name === "ValidationError" || err.name === "BadRequestError")
    err.status = 400;
  else
    err.status = 500;

  return err;
};

module.exports.paginate = function(req) {
  var paginate = {
    skip: req.query.skip || 0,
    top: req.query.top || 20,
    sort: req.query.sort || '-createdDate'
  };

  return paginate;
};

module.exports.isValidId = function(id) {
  return id.match(/^[0-9a-fA-F]{24}$/);
};

module.exports.bindModelToObj = function(model, obj) {
  Object.keys(model).forEach(function(key) {
      model[key] = obj[key] || model[key];
  });

  return model;
};

module.exports.createError = function(status, message) {
  var error = new Error(message);
  error.status = status;
  return error;
};

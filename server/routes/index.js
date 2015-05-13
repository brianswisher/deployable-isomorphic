(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var React = require('react');
  var ReactAsync = require('react-async');
  var App = React.createFactory(
    require('../../bundle/assets/javascripts/App.jsx')
  );

  // catch all at bottom
  router.get('*', function(req, res) {
    ReactAsync.renderToStringAsync(
      App({}),
      function(err, markup) {
        res.send('<!DOCTYPE html>'+markup);
      }
    );
  });

  module.exports = router;
}());

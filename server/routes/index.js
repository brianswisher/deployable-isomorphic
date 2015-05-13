(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var React = require('react');
  // var App = React.createFactory(
  //   require('../../bundle/assets/javascripts/App.jsx')
  // );

  // catch all at bottom
  router.get('*', function(req, res) {
    res.send('deployable-isomorphic');
  });

  module.exports = router;
}());

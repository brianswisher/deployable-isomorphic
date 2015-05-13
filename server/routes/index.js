(function() {
  'use strict';

  var ENV = process.env.ENV;

  var express = require('express');
  var router = express.Router();
  var url = require('url');
  var React = require('react');
  var ReactAsync = require('react-async');

  var App = React.createFactory(
    require('../../bundle/assets/javascripts/App.jsx')
  );

  // catch all at bottom
  router.get('*', function(req, res) {
    var path = url.parse(req.url).pathname;

    var getHost = function() {
      var host = req.headers.host.toString();

      if (ENV === 'development') {
        return host.substring(0, host.length - 1) + 1;
      } else {
        return host;
      }
    }

    ReactAsync.renderToStringAsync(
      App({
        path: path,
        ENV: ENV,
        host: getHost()
      }),
      function(err, markup) {
        res.send('<!DOCTYPE html>'+markup);
      }
    );
  });

  module.exports = router;
}());

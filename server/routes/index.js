(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();

  // catch all at bottom
  router.get('*', function(req, res) {
    res.send('deployable');
  });

  module.exports = router;
}());

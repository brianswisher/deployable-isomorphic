(function() {
  'use strict';

  require("babel/register")({
    // Optional ignore regex - if any filenames **do** match this regex then they
    // aren't compiled
    ignore: /node_modules/,

    // Optional only regex - if any filenames **don't** match this regex then they
    // aren't compiled
    // only: /my_es6_folder/,

    // See options above for usage
    whitelist: [],
    blacklist: [],

    // Setting this will remove the currently hooked extensions of .es6, `.es`, `.jsx`
    // and .js so you'll have to add them back if you want them to be used again.
    extensions: [".es6", ".es", ".jsx", ".js"]
  });

  var express = require('express');
  var router = express.Router();
  // var App = React.createFactory(
  //   require('../../bundle/assets/javascripts/App.jsx')
  // );

  // catch all at bottom
  router.get('*', function(req, res) {
    res.send('deployable-isomorphic');
  });

  module.exports = router;
}());

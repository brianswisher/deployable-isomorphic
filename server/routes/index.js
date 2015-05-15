'use strict';

import appJSX from "../../bundle/assets/javascripts/App.jsx";
import express from "express";
import {parse} from "url";
import {createFactory} from "react";
import {renderToStringAsync} from "react-async";

let App = createFactory(appJSX);
let ENV = process.env.ENV;
let router = express.Router();

router.get('*', (req, res) => {
  let path = parse(req.url).pathname;
  let getHost = function() {
    let host = req.headers.host.toString();

    if (ENV === 'development') {
      return host.substring(0, host.length - 1) + 1;
    }

    return host;
  }

  let data = {
    path: path,
    encrypted: req.connection.encrypted,
    ENV: ENV,
    host: getHost()
  };

  renderToStringAsync(new App(data), (err, markup) => {
    if (err) {
      throw err;
    }

    res.send(`<!DOCTYPE html>${markup}`);
  });
});

export default router;

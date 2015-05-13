import React from 'react';

var App = React.createFactory(
  require('./App.jsx')
);

if (typeof window !== 'undefined') {
  window.onload = function() {
    var json = JSON.parse(document.body.getAttribute('data-json'));

    var getHost = function() {
      var host = json.host.split('//').join('').split('1/').join('0');

      if (json.ENV === 'development') {
        return host.substring(0, host.length - 1) + 1;
      } else {
        return host;
      }
    }

    React.render(
      App({
        path: json.path,
        ENV: json.ENV,
        host: getHost()
      }),
      document
    );
  }
}

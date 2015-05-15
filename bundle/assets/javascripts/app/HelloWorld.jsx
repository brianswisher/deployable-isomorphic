import React from 'react';
import ReactAsync from 'react-async';
import request from 'superagent';

module.exports =
  React.createClass({

    displayName: 'HelloWorld',

    mixins: [ReactAsync.Mixin],

    getInitialStateAsync: function(cb) {
      request.get(
        this._localEndPoint('/data.json'),
        function(error, response) {
          cb(error, {async: response.body});
        }
      );
    },

    render: function() {
      return (
        <div>
          <p>{this._message()}</p>
        </div>
      )
    },

    _localEndPoint: function(path) {
      var protocol = 'http';
      var endpoint;

      if (this.props.encrypted) {
        protocol += 's';
      }

      if (this.props.encrypted === 'undefined') {
        protocol = window.location.protocol;

        if (protocol.slice(-1) === ':') {
          protocol = protocol.substr(0,protocol.length - 1);
        }
      }

      return protocol + '://' + this.props.host + path;
    },

    _message: function() {
      var message = '';

      if (this.state.async) {
        message = this.state.async.message
      }

      return message;
    }
  });

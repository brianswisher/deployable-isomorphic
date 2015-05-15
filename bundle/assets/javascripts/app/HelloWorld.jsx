import React from 'react';
import ReactAsync from 'react-async';
import request from 'superagent';

module.exports =
  React.createClass({

    displayName: 'HelloWorld',

    mixins: [ReactAsync.Mixin],

    getInitialStateAsync: function(cb) {
      var protocol = 'http';

      if (this.props.encrypted) {
        protocol += 's';
      }

      if (this.props.encrypted === 'undefined') {
        protocol = protocol.substr(0,4);
      }

      request.get(
        protocol + '://' + this.props.host + '/data.json',
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

    _message: function() {
      var message = '';

      if (this.state.async) {
        message = this.state.async.message
      }

      return message;
    }
  });

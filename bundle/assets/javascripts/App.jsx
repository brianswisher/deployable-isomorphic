import Device from './app/Device.jsx';
import React from 'react';
import Page from 'page';
import Screen from './app/Screen.jsx';
import {text} from './config';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      screen: null,
      style: {
        fontFamily: 'arial',
        textAlign: 'center'
      }
    };
  }

  componentWillMount() {
    this._routeInit();
  }

  componentDidMount() {
    this._route();
  }

  handleLink(e) {
    e.preventDefault();

    Page(e.target.getAttribute('href'));
  }

  render() {
    return (
      <html>
        <head lang="en">
            <meta charSet="UTF-8"/>
            <title>React App</title>
        </head>
        <body data-json={this._getJson()}>
          <div id="viewport" style={this.state.style}>
            {this.state.screen}
          </div>
        </body>
        <script type="text/javascript"
                src={this._getAppPath()}></script>
       </html>
    );
  }

  _getAppPath() {
    var filename = 'app.bundle.js';

    if (this.props.ENV === 'development') {
      filename =  '__' + filename;
    }

    return '/' + filename;
  }

  _getContent() {
    var path = this.props.path;
  }

  _getJson() {
    return '{"ENV":"' + this.props.ENV +
      '","path":"' + this.props.path +
      '","host":"' + this.props.host +
      '"}';
  }

  _route() {
    var that = this;
    var {path} = this.props;

    Page('/', function (ctx) {
      that.setState({ screen: that._screenHome() });
    });

    Page('/one', function (ctx) {
      that.setState({ screen: that._screenOne() });
    });

    Page('/two', function (ctx) {
      that.setState({ screen: that._screenTwo() });
    });

    Page('*', function (ctx) {
      that.setState({ screen: that._screen404() });
    });

    Page.start();
  }

  _routeInit() {
    var {path} = this.props;

    if (path === '/') {
      this.state.screen = this._screenHome()
    } else if (path === '/one') {
      this.state.screen = this._screenOne()
    } else if (path === '/two') {
      this.state.screen = this._screenTwo()
    } else {
      this.state.screen = this._screen404()
    }
  }

  _screenHome() {
    return (
      <div>
        <a href="/one" onClick={this.handleLink}>
          isomorphic
        </a>
        <br/>
        <Device/>
      </div>
    )
  }

  _screenOne() {
    return (
      <div>
        <a href="/two" onClick={this.handleLink}>
          one
        </a>
        <br/>
        <Screen text={[text[0], text[1]]}/>
      </div>
    )
  }

  _screenTwo() {
    return (
      <div>
        <a href="/missing" onClick={this.handleLink}>
          two
        </a>
        <br/>
        <Screen text={[text[1], text[2]]}/>
      </div>
    )
  }

  _screen404() {
    return (
      <div>
        <a href="/" onClick={this.handleLink}>
          404
        </a>
        <p>
          The page you were looking for was not found!
        </p>
      </div>
    )
  }
}

export default App;

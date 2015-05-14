import React from 'react';
import HelloWorld from './app/HelloWorld.jsx';
import Page from 'page';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      screen: null
    };
  }

  componentWillMount() {
    this._routeInit();
  }

  componentDidMount() {
    this._route();
  }

  handleClick(e) {
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
          <div id="viewport">
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

    Page('/b', function (ctx) {
      that.setState({ screen: that._screenOne() });
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
    } else if (path === '/b') {
      this.state.screen = this._screenOne()
    } else {
      this.state.screen = this._screen404()
    }
  }

  _screenHome() {
    return <a href="/b" onClick={this.handleClick}>a</a>
  }

  _screenOne() {
    return <a href="/bb" onClick={this.handleClick}>b</a>
  }

  _screen404() {
    return <a href="/" onClick={this.handleClick}>404</a>
  }
}

export default App;

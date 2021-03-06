import HelloWorld from './app/HelloWorld.jsx';
import InlineCss from 'react-inline-css';
import React from 'react';
import Page from 'page';
import Screen from './app/Screen.jsx';
import {text} from './config';

class App extends React.Component {

  static css() {
    return (`
      & {
        font-family: arial;
        text-align: center;
      }
    `);
  }

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
          <InlineCss stylesheet={App.css()} namespace="viewport">
            {this.state.screen}
          </InlineCss>
        </body>
        <script type="text/javascript"
                src="/modernizr.js"></script>
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
    var json = ''

    json += '{"ENV":"' + this.props.ENV
    json += '","path":"' + this.props.path
    json += '","encrypted":"' + this.props.encrypted
    json += '","host":"' + this.props.host
    json += '"}'

    return json;
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
        <HelloWorld {...this.props}/>
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

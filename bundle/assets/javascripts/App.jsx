import React from 'react';
import HelloWorld from './app/HelloWorld.jsx';
import Page from 'page';

class App extends React.Component {

  constructor(props) {
    super(props);

    var path = this.props.path;

    this.state = {
      component: <a href="/b" onClick={this.handleClick}>a</a>
    };
  }

  componentDidMount() {
    var that = this;

    Page('/', function (ctx) {
      that.setState({ component: <a href="/b" onClick={that.handleClick}>a</a> });
    });

    Page('/b', function (ctx) {
      that.setState({ component: <a href="/bb" onClick={that.handleClick}>b</a> });
    });

    Page('*', function (ctx) {
      that.setState({ component: <a href="/" onClick={that.handleClick}>404</a> });
    });

    Page.start();
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
            {this.state.component}
          </div>
        </body>
        <script type="text/javascript"
                src={this._getModernizerPath()}></script>
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

  _getJson() {
    return '{"ENV":"' + this.props.ENV +
      '","path":"' + this.props.path +
      '","host":"' + this.props.host +
      '"}';
  }

  _getMessage() {
    return 'hello world';
  }

  _getModernizerPath() {
    return 'https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js';
  }
}

export default App;

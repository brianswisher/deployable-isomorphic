import React from 'react';
import HelloWorld from './app/HelloWorld.jsx';

class App extends React.Component {
  render() {
    return (
      <html>
        <head lang="en">
            <meta charSet="UTF-8"/>
            <title>React App</title>
        </head>
        <body>
          <div id="main">
            <HelloWorld/>
          </div>
        </body>
        <script type="text/javascript"
                src={this._getModernizerPath()}></script>
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

  _getMessage() {
    return 'hello world';
  }

  _getModernizerPath() {
    return 'https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js';
  }
}

export default App;

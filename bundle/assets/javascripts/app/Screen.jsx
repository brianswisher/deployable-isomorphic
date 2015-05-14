import React from 'react';

class Screen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      style: {}
    };
  }

  componentDidMount() {
    this.state.style = {
      color: 'blue',
      width: '80%',
      display: 'inline-block',
      fontSize: 16,
      textAlign: 'left'
    }

    this.setState(
      {style: this.state.style}
    );
  }

  render() {
    var style = {
      width: '80%',
      margin: '0 auto',
      maxWidth: 500
    };

    return (
      <div style={this.state.style}>
        {this._getParagraphs()}
      </div>
    )
  }

  _getParagraphs() {
    return this.props.text.map(function(t, i) {
      return <p key={i}>{t}</p>
    })
  }
}

export default Screen;

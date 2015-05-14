import React from 'react';

class Screen extends React.Component {
  render() {
    return (
      <div>
        <p>
          {this.props.text}
        </p>
      </div>
    )
  }
}

export default Screen;

import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';

@showroomScopeDecorator
class ScriptsLoaderScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mountLoader: true,
      loaderState: {}
    };
  }

  handleToggleMountLoader() {
    this.setState({ mountLoader: !this.state.mountLoader });
  }

  handleChange(loaderState) {
    this.setState({ loaderState });
  }

  render() {
    let { loaderState } = this.state;
    return (
      <div>
        <button onClick={this.handleToggleMountLoader.bind(this)}>
          Toggle mount loader
        </button>
        <div>
          <div>
            <strong>Loading: </strong>
            <span>{loaderState.loading}</span>
          </div>
          <div>
            <strong>Success: </strong>
            <span>{loaderState.succesed}</span>
          </div>
          <div>
            <strong>Failed: </strong>
            <span>{loaderState.failed}</span>
          </div>
        </div>
        {this.state.mountLoader && this._renderChildren()}
      </div>
    )
  }
}

export default ScriptsLoaderScope;

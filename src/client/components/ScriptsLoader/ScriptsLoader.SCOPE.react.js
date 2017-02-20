import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';

@showroomScopeDecorator
class ScriptsLoaderScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mountLoader: true,
      loaderState: {
        loading: [],
        success: [],
        failure: []
      }
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
    console.log('state', loaderState);
    return (
      <div>
        <button onClick={this.handleToggleMountLoader.bind(this)}>
          Toggle mount loader
        </button>
        <div>
          <div>
            <strong>Loading: </strong>
            {loaderState.loading.map((val, index) => (<span key={val+index}>&nbsp;{val}</span>))}
          </div>
          <div>
            <strong>Succesed: </strong>
            {loaderState.success.map((val, index) => (<span key={val+index}>&nbsp;{val}</span>))}
          </div>
          <div>
            <strong>Failed: </strong>
            {loaderState.failure.map((val, index) => (<span key={val+index}>&nbsp;{val}</span>))}
          </div>
        </div>
        {this.state.mountLoader && this._renderChildren()}
      </div>
    )
  }
}

export default ScriptsLoaderScope;

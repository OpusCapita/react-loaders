import React, { Component, PropTypes } from 'react';
import ScriptsLoader from '../ScriptsLoader';

export default
class ScriptsLoaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderState: {
        loading: [],
        success: [],
        failure: []
      }
    };
  }

  handleLoaderChange(loaderState) {
    this.setState({ loaderState });
  }

  isLoaded() {
    return this.state.loaderState.loading.length;
  }

  isError() {
    return this.state.loaderState.failure.length;
  }

  render() {
    let {
      children,
      scripts,
      renderSpinner,
      renderError
    } = this.props;

    let errorElement = this.isError() ? renderError(this.state.loaderState.failure): null;
    let spinnerElement = this.isLoaded() ? renderSpinner(this.state.loaderState.loading) : null;
    let content = errorElement || spinnerElement || children;

    return (
      <div className="scripts-loader-container">
        <ScriptsLoader
          scripts={scripts}
          onChange={this.handleLoaderChange.bind(this)}
        />
        {content}
      </div>
    );
  }
}

ScriptsLoaderContainer.propTypes = {
  renderSpinner: PropTypes.func,
  renderError: PropTypes.func,
  scripts: PropTypes.array
};
ScriptsLoaderContainer.defaultProps = {
  renderSpinner: (scriptNames) => (<span>Loading ... {scriptNames}</span>),
  renderError: (scriptNames) => (<span>Error ... {scriptNames}</span>),
  scripts: []
};

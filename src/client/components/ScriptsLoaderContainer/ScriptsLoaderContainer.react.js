import React, { Component, PropTypes } from 'react';
import ScriptsLoader from '../ScriptsLoader';
import './ScriptsLoaderContainer.less';

export default
class ScriptsLoaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderState: {
        loading: [],
        succesed: [],
        failed: []
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
    return this.state.loaderState.failed.length;
  }

  render() {
    let {
      children,
      scripts,
      getSpinnerComponent,
      getErrorComponent
    } = this.props;

    let spinnerElement = this.isLoaded() ? getSpinnerComponent(this.state.loaderState.loading) : null;
    let errorElement = this.isError() ? getErrorComponent(this.state.loaderState.failed): null;

    return (
      <div className="scripts-loader-container">
        <ScriptsLoader
          scripts={scripts}
          onChange={this.handleLoaderChange.bind(this)}
        />
        {spinnerElement}
        {errorElement}
        {children}
      </div>
    );
  }
}

ScriptsLoaderContainer.propTypes = {
  getSpinnerComponent: PropTypes.func,
  getErrorComponent: PropTypes.func,
  scripts: PropTypes.object
};
ScriptsLoaderContainer.defaultProps = {
  getSpinnerComponent: (scriptNames) => (<span>Loading ... {scriptNames}</span>),
  getErrorComponent: (scriptNames) => (<span>Error ... {scriptNames}</span>),
  scripts: {}
};

import React, { Component, PropTypes } from 'react';
import ScriptsLoader from './scripts-loader.js';
import isEqual from 'lodash/isEqual';

export default
class ScriptsLoaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccess: false,
      isError: false
    };
  }

  componentDidMount() {
    this.initScriptsLoader(this.props.scripts);
  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(this.props.scripts, nextProps.scripts)) {
      this.scriptsLoader.destroy();
      this.initScriptsLoader(nextProps.scripts);
      this.setState({
        isSuccess: false,
        isError: false
      });
    }
  }

  componentWillUnmount() {
    this.scriptsLoader.destroy();
  }

  initScriptsLoader(urls) {
    this.scriptsLoader = new ScriptsLoader(urls, this.handleSuccess.bind(this), this.handleError.bind(this));
  }

  handleSuccess() {
    this.setState({
      isSuccess: true,
      isError: false
    });
  }

  handleError() {
    this.setState({
      isSuccess: false,
      isError: true
    });
  }

  render() {
    let {
      children,
      scripts,
      renderSpinner,
      renderError,
      ...restProps
    } = this.props;

    let { isSuccess, isError } = this.state;

    let errorElement = isError ? renderError(): null;
    let spinnerElement = (!isSuccess && !isError) ? renderSpinner() : null;
    let content = errorElement || spinnerElement || children;

    return (
      <div { ...restProps }>
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
  renderSpinner: () => (<span>Loading ...</span>),
  renderError: () => (<span>Error ...</span>),
  scripts: []
};

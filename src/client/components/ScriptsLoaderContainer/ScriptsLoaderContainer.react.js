import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScriptsLoader from './scripts-loader.js';
import isEqual from 'lodash/isEqual';

export default
class ScriptsLoaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSuccess: false,
      isError: false
    };
  }

  componentDidMount() {
    this.initScriptsLoader(this.props.scripts, this.props.sync);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.scripts, nextProps.scripts)) {
      this.scriptsLoader.destroy();
      this.initScriptsLoader(nextProps.scripts, nextProps.sync);
    }
  }

  componentWillUnmount() {
    this.scriptsLoader.destroy();
  }

  initScriptsLoader(urls, sync) {
    this.scriptsLoader = new ScriptsLoader(urls, this.handleSuccess.bind(this), this.handleError.bind(this), sync);
    this.setState({
      isLoading: true,
      isSuccess: false,
      isError: false
    });
  }

  handleSuccess() {
    this.setState({
      isLoading: false,
      isSuccess: true,
      isError: false
    });
  }

  handleError() {
    this.setState({
      isLoading: false,
      isSuccess: false,
      isError: true
    });
  }

  render() {
    let {
      children,
      renderSpinner,
      renderError,
      scripts, // eslint-disable-line no-unused-vars
      sync, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;

    let { isSuccess, isLoading, isError } = this.state;

    let content = null;

    if (isError) {
      content = renderError();
    } else if (isLoading) {
      content = renderSpinner();
    } else if (isSuccess) {
      content = typeof children === 'function' ? children() : children;
    }

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
  scripts: PropTypes.array,
  sync: PropTypes.bool
};
ScriptsLoaderContainer.defaultProps = {
  renderSpinner: () => (<span>Loading ...</span>),
  renderError: () => (<span>Error ...</span>),
  scripts: [],
  sync: false
};

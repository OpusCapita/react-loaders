import React, { Component, PropTypes } from 'react';
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
    this.initScriptsLoader(this.props.scripts);
  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(this.props.scripts, nextProps.scripts)) {
      this.scriptsLoader.destroy();
      this.initScriptsLoader(nextProps.scripts);
    }
  }

  componentWillUnmount() {
    this.scriptsLoader.destroy();
  }

  initScriptsLoader(urls) {
    this.scriptsLoader = new ScriptsLoader(urls, this.handleSuccess.bind(this), this.handleError.bind(this));
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
      scripts,
      renderSpinner,
      renderError,
      ...restProps
    } = this.props;

    let { isSuccess, isLoading, isError } = this.state;

    let content = null;

    if(isError) {
      content = renderError();
    } else if (isLoading) {
      content = renderSpinner();
    } else if (isSuccess) {
      content = children;
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
  scripts: PropTypes.array
};
ScriptsLoaderContainer.defaultProps = {
  renderSpinner: () => (<span>Loading ...</span>),
  renderError: () => (<span>Error ...</span>),
  scripts: []
};

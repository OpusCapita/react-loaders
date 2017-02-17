import React, { Component, PropTypes } from 'react';
import isEqual from 'lodash/isEqual';

export default
class ScriptsLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptElements: {},
      loading: [],
      succesed: [],
      failed: [],
      loadListeners: {},
      errorListeners: {}
    };
  }

  componentDidMount() {
    this.createScripts(this.props.scripts, this.handleLoad);
  }

  componentWillUnmount() {
    this.removeScripts(this.props.scripts);
  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(this.props.scripts, nextProps.scripts)) {
      console.log(this.props.scripts, nextProps.scripts);
      this.createScripts(nextProps.scripts);
      this.removeScripts(nextProps.scripts);
    }
  }

  handleOnChange(state) {
    this.props.onChange({
      loading: state.loading,
      succesed: state.succesed,
      failed: state.failed
    });
  }

  createScripts(scripts) {
    Object.keys(scripts).forEach(
      scriptName => {
        if(!this.isSuccesed(scriptName) || this.isFailed(scriptName)) {
          this.createScript(scriptName, scripts[scriptName]);
        }
      }
    );
  }

  createScript(scriptName, scriptSrc) {
    let scriptElement = document.createElement('script');
    scriptElement.src = scriptSrc;

    let loadListener = () => this.handleLoad(scriptName);
    let errorListener = () => this.handleError(scriptName);
    scriptElement.addEventListener('load', loadListener);
    scriptElement.addEventListener('error', errorListener);

    document.head.appendChild(scriptElement);

    let nextState = {
      ...this.state,
      scriptElements: Object.assign({}, this.state.scriptElements, { [scriptName]: scriptElement }),
      loadListeners: Object.assign({}, this.state.loadListeners, { [scriptName]: loadListener }),
      errorListeners: Object.assign({}, this.state.errorListeners, { [scriptName]: errorListener }),
      loading: this.state.loading.concat([ scriptName ])
    };
    this.handleOnChange(nextState);
    this.setState(nextState);
  }

  isSuccesed(scriptName) {
    return this.state.succesed.filter(succesedScriptName => succesedScriptName === scriptName).length;
  }

  isFailed(scriptName) {
    return this.state.failed.filter(succesedScriptName => succesedScriptName === scriptName).length;
  }

  removeScript(scriptName) {
    let scriptElement = this.state.scriptElements[scriptName];
    scriptElement.removeEventListener('load', this.state.loadListeners[scriptName]);
    scriptElement.removeEventListener('error', this.state.errorListeners[scriptName]);
    document.head.removeChild(scriptElement);
  }

  removeScripts(scripts) {
    Object.keys(scripts).map(scriptName => this.removeScript(scriptName));
    let nextState = this.state;
    this.handleOnChange({ nextState });
  }

  handleLoad(scriptName) {
    let nextState = {
      ...this.state,
      failed: this.state.loading.filter(scriptName => scriptName !== scriptName),
      loading: this.state.loading.filter(scriptName => scriptName !== scriptName),
      succesed: this.state.succesed.concat([ scriptName ])
    };
    this.handleOnChange(nextState);
    this.setState(nextState);
  }

  handleError(scriptName) {
    let nextState = {
      ...this.state,
      failed: this.state.succesed.concat([ scriptName ]),
      loading: this.state.loading.filter(scriptName => scriptName !== scriptName),
      succesed: this.state.loading.filter(scriptName => scriptName !== scriptName)
    };
    this.handleOnChange(nextState);
    this.setState(nextState);
  }

  render() {
    return null;
  }
}

ScriptsLoader.propTypes = {
  scripts: PropTypes.object,
  onChange: PropTypes.func
};
ScriptsLoader.defaultProps = {
  scripts: {},
  onChange: () => {}
};

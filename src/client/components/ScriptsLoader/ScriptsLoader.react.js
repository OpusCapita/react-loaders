import React, { Component, PropTypes } from 'react';
import isEqual from 'lodash/isEqual';

export default
class ScriptsLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorListeners: {},
      failure: [],
      loadListeners: {},
      loading: [],
      scriptDOMElements: {},
      success: []
    };
  }

  componentDidMount() {
    let nextState = this.createScripts(this.props.scripts, this.state);
    this.handleOnChange(nextState);
    this.setState(nextState);
  }

  componentWillUnmount() {
    let nextState = this.removeScripts(this.props.scripts, this.state);
    this.handleOnChange(nextState);
  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(this.props.scripts, nextProps.scripts)) {
      let scriptsToRemove = this.getScriptsToRemove(this.props.scripts, nextProps.scripts);
      let scriptsToCreate = this.getScriptsToCreate(this.props.scripts, nextProps.scripts);

      let nextState = this.removeScripts(scriptsToRemove, this.state);
      nextState = this.createScripts(scriptsToCreate, nextState);

      this.handleOnChange(nextState);
      this.setState(nextState);
    }
  }

  getScriptsToRemove(prevScripts, nextScripts) {
    return prevScripts.filter(prevScript => nextScripts.indexOf(prevScript) === -1);
  }

  getScriptsToCreate(prevScripts, nextScripts) {
    return nextScripts.filter(nextScript => prevScripts.indexOf(nextScript) === -1);
  }

  createScripts(scripts, state) {
    return scripts.reduce((result, script) => this.createScript(script, result), state);
  }

  removeScripts(scripts, state) {
    return scripts.reduce((result, script) => this.removeScript(script, result), state);
  }

  createScript(script, state) {
    let loadListener = () => this.handleLoad(script);
    let errorListener = () => this.handleError(script);

    let scriptDOMElement = document.createElement('script');
    scriptDOMElement.addEventListener('load', loadListener);
    scriptDOMElement.addEventListener('error', errorListener);
    scriptDOMElement.src = script;
    document.head.appendChild(scriptDOMElement);

    return ({
      ...state,
      errorListeners: Object.assign({}, state.errorListeners, { [script]: errorListener }),
      loadListeners: Object.assign({}, state.loadListeners, { [script]: loadListener }),
      loading: state.loading.concat([ script ]),
      scriptDOMElements: Object.assign({}, state.scriptDOMElements, { [script]: scriptDOMElement })
    });
  }

  isSuccess(script) {
    return this.state.success.filter(successScript => successScript === script).length;
  }

  isFailure(script) {
    return this.state.failure.filter(failureScript => failureScript === script).length;
  }

  removeScript(script, state) {
    let scriptDOMElement = state.scriptDOMElements[script];
    scriptDOMElement.removeEventListener('load', state.loadListeners[script]);
    scriptDOMElement.removeEventListener('error', state.errorListeners[script]);
    document.head.removeChild(scriptDOMElement);

    return ({
      ...state,
      errorListeners: Object.assign({}, state.errorListeners, { [script]: undefined }),
      failure: state.failure.filter(failureScript => failureScript !== script),
      loadListeners: Object.assign({}, state.loadListeners, { [script]: undefined }),
      loading: state.loading.filter(loadingScript => loadingScript !== script),
      scriptDOMElements: Object.assign({}, state.scriptDOMElements, { [script]: undefined }),
      success: state.success.filter(successScript => successScript !== script)
    });
  }

  handleOnChange(state) {
    this.props.onChange({
      loading: state.loading,
      success: state.success,
      failure: state.failure
    });
  }

  handleLoad(script) {
    let nextState = {
      ...this.state,
      failure: this.state.failure.filter(failureScript => failureScript !== script),
      loading: this.state.loading.filter(loadingScript => loadingScript !== script),
      success: this.state.success.concat([ script ])
    };
    this.handleOnChange(nextState);
    this.setState(nextState);
  }

  handleError(script) {
    let nextState = {
      ...this.state,
      failure: this.state.failure.concat([ script ]),
      loading: this.state.loading.filter(loadingScript => loadingScript !== script),
      success: this.state.success.filter(successScript => successScript !== script)
    };
    this.handleOnChange(nextState);
    this.setState(nextState);
  }

  render() {
    return null;
  }
}

ScriptsLoader.propTypes = {
  scripts: PropTypes.array,
  onChange: PropTypes.func
};
ScriptsLoader.defaultProps = {
  scripts: [],
  onChange: () => {}
};

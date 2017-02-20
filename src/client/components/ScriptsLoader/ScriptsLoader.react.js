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
    let createScriptsState = this.createScripts(this.props.scripts, this.state);
    this.handleOnChange(createScriptsState);
    this.setState(createScriptsState);
  }

  componentWillUnmount() {
    let removeScriptsState = this.removeScripts(this.props.scripts, this.state);
    this.handleOnChange(removeScriptsState);
    this.setState(removeScriptsState);
  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(this.props.scripts, nextProps.scripts)) {
      let scriptsToRemove = this.getScriptsToRemove(this.props.scripts, nextProps.scripts);
      let scriptsToCreate = this.getScriptsToCreate(this.props.scripts, nextProps.scripts);

      let removeScriptsState = this.removeScripts(scriptsToRemove, this.state);
      let createScriptsState = this.createScripts(scriptsToCreate, removeScriptsState);

      this.handleOnChange(createScriptsState);
      this.setState(createScriptsState);
    }
  }

  getScriptsToRemove(prevScripts, nextScripts) {
    return Object.keys(prevScripts).reduce(
      (result, scriptName) => {
        if(
          !Object.keys(nextScripts)[scriptName] ||
          Object.keys(nextScripts)[scriptName] !== Object.keys(prevScripts)[scriptName]
        ) {
          return Object.assign({}, result, { [scriptName]: prevScripts[scriptName] });
        }
        return result;
      }, {}
    );
  }

  getScriptsToCreate(prevScripts, nextScripts) {
    return Object.keys(nextScripts).reduce(
      (result, scriptName) => {
        if(
          !Object.keys(prevScripts)[scriptName] ||
          Object.keys(prevScripts)[scriptName] !== Object.keys(nextScripts)[scriptName]
        ) {
          return Object.assign({}, result, { [scriptName]: nextScripts[scriptName] });
        }
        return result;
      }, {}
    );
  }

  createScripts(scripts, state) {
    return Object.keys(scripts).reduce(
      (accumulatedState, scriptName) => this.createScript(scriptName, scripts[scriptName], accumulatedState),
      state
    );
  }

  removeScripts(scripts, state) {
    return Object.keys(scripts).reduce(
      (accumulatedState, scriptName) => this.removeScript(scriptName, accumulatedState),
      state
    );
  }

  createScript(scriptName, scriptSrc, state) {
    let scriptElement = document.createElement('script');
    scriptElement.src = scriptSrc;

    let loadListener = () => this.handleLoad(scriptName);
    let errorListener = () => this.handleError(scriptName);
    scriptElement.addEventListener('load', loadListener);
    scriptElement.addEventListener('error', errorListener);

    let nextState = {
      ...state,
      scriptElements: Object.assign({}, state.scriptElements, { [scriptName]: scriptElement }),
      loadListeners: Object.assign({}, state.loadListeners, { [scriptName]: loadListener }),
      errorListeners: Object.assign({}, state.errorListeners, { [scriptName]: errorListener }),
      loading: state.loading.concat([ scriptName ])
    };
    document.head.appendChild(scriptElement);
    return nextState;
  }

  isSuccesed(scriptName) {
    return this.state.succesed.filter(succesedScriptName => succesedScriptName === scriptName).length;
  }

  isFailed(scriptName) {
    return this.state.failed.filter(succesedScriptName => succesedScriptName === scriptName).length;
  }

  removeScript(scriptName, state) {
    let scriptElement = state.scriptElements[scriptName];

    scriptElement.removeEventListener('load', state.loadListeners[scriptName]);
    scriptElement.removeEventListener('error', state.errorListeners[scriptName]);

    let nextState = {
      ...state,
      scriptElements: Object.assign({}, state.scriptElements, { [scriptName]: undefined }),
      loadListeners: Object.assign({}, state.loadListeners, { [scriptName]: undefined }),
      errorListeners: Object.assign({}, state.errorListeners, { [scriptName]: undefined }),
      loading: state.loading.filter(loadingScriptName => loadingScriptName !== scriptName ),
      succesed: state.succesed.filter(succesedScriptName => succesedScriptName !== scriptName ),
      failed: state.failed.filter(failedScriptName => failedScriptName !== scriptName )
    };
    document.head.removeChild(scriptElement);
    return nextState;
  }

  handleOnChange(state) {
    this.props.onChange({
      loading: state.loading,
      succesed: state.succesed,
      failed: state.failed
    });
  }

  handleLoad(scriptName) {
    let nextState = {
      ...this.state,
      failed: this.state.failed.filter(failedScriptName => failedScriptName !== scriptName),
      loading: this.state.loading.filter(loadingScriptName => loadingScriptName !== scriptName),
      succesed: this.state.succesed.concat([ scriptName ])
    };
    console.log('load:::', nextState);
    this.handleOnChange(nextState);
    this.setState(nextState);
  }

  handleError(scriptName) {
    let nextState = {
      ...this.state,
      failed: this.state.failed.concat([ scriptName ]),
      loading: this.state.loading.filter(loadingScriptName => loadingScriptName !== scriptName),
      succesed: this.state.succesed.filter(succesedScriptName => succesedScriptName !== scriptName)
    };

    console.log('error:::', nextState);
    this.handleOnChange(nextState);
    this.setState(nextState);
  }

  render() {
    console.log(this.state);
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

import React from 'react';
import scriptjs from 'scriptjs';
import get from 'lodash/get';

/**
 * Get proxy to loaded component
 *
 * @param serviceName - service name (for service registry)
 * @param jsFileName - path to file loaded script name (by default used moduleName)
 * @param moduleName - export module name to window scope
 * @param componentPath - component path on module
 * @param serviceRegistry - service registry
 * @param inProgressComponent - spinner element. will be shown while component not loaded yet.
 */
export default function({ serviceName, jsFileName, moduleName, componentPath, serviceRegistry, inProgressComponent }) {
  return class extends React.Component {
    state = {
      loadedComponent: null
    };

    getLoadedComponent = () => {
      const module = window[moduleName].default;
      let loadedComponent = module;
      if (componentPath) {
        loadedComponent = get(module, componentPath);
      }

      return loadedComponent;
    };

    componentDidMount = () => {
      if (window[moduleName]) {
        this.setState({ loadedComponent: this.getLoadedComponent() });
      } else {
        scriptjs(serviceRegistry(serviceName).url + `/static/components/${jsFileName || moduleName}.js`, () => {
          this.setState({ loadedComponent: this.getLoadedComponent() });
        });
      }
    };

    render() {
      let { loadedComponent } = this.state;
      if (loadedComponent) {
        return React.createElement(loadedComponent, this.props);
      } else if (inProgressComponent) {
        return React.createElement(inProgressComponent);
      } else {
        return null;
      }
    }
  }
}

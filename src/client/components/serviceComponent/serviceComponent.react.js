import React from 'react';
import scriptjs from 'scriptjs';
import get from 'lodash/get';

export default function({serviceName, jsFileName, moduleName, componentPath, serviceRegistry, inProgressComponent}) {
// export default function(service, componentName) {
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

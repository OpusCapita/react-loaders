import React from 'react';
import scriptjs from 'scriptjs';
import omit from 'lodash/omit';

export default function(service, componentName) {
  return class extends React.Component {
    state = {
      loadedComponent: null
    };

    static propTypes = {
      loadWith: React.PropTypes.func.isRequired,
      inProgress: React.PropTypes.element
    };

    componentDidMount = () => {
      if (window[componentName]) {
        this.setState({ loadedComponent: window[componentName].default });
      } else {
        let { loadWith } = this.props;

        scriptjs(loadWith(service).url + `/static/components/${componentName}.js`, () => {
          this.setState({ loadedComponent: window[componentName].default });
        });
      }
    };

    render() {
      let { loadedComponent } = this.state;
      let { inProgress } = this.props;
      if (loadedComponent) {
        return React.createElement(loadedComponent, omit(this.props, ['loadWith', 'inProgress']));
      } else if (inProgress) {
        return inProgress;
      } else {
        return null;
      }
    }
  }
}

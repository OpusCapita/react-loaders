import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import { I18nManager } from '@opuscapita/i18n';

@showroomScopeDecorator
class ScriptsLoaderContainerScope extends Component {
  state = {
    load: true
  }

  getChildContext() {
    if (!this.context.i18n) {
      this.context.i18n = new I18nManager({ locale: 'en' });
    }
    return { i18n: this.context.i18n };
  }

  handleClick = _ => this.setState(ps => ({ load: !ps.load }));

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Toggle</button>
        {this._renderChildren()}
      </div>
    )
  }
}

ScriptsLoaderContainerScope.contextTypes = {
  i18n: PropTypes.object
};
ScriptsLoaderContainerScope.childContextTypes = {
  i18n: PropTypes.object
};

export default ScriptsLoaderContainerScope;

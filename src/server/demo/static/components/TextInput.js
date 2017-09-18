import React from 'react';

export default class TextInput extends React.Component {
  render() {
    return (
      <input {...this.props} className="form-control" type="text"/>
    )
  }
}
import React from 'react';

class DatePicker extends React.Component {
  render() {
    return (
      <i className="fa fa-calendar">&nbsp;</i>
    )
  }
}

class DateInput extends React.Component {
  render() {
    return (
      <div className="input-group date">
        <input className="form-control" type="text"/>
        <div className="input-group-addon">
          <DatePicker/>
        </div>
      </div>
    )
  }
}

export { DateInput, DatePicker }
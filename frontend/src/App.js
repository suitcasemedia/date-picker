import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import moment from 'moment'
import 'moment/locale/en-gb';
import {whatHappenedThisDay} from './utils/whatHappenedThisDay'
import { DatePicker, Card } from 'antd'
import { isLeapYear } from './utils/isLeapYear';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const { RangePicker} = DatePicker
const dateFormat = "DD-MM-YYYY"
moment.locale('en-gb');


class App extends Component {

  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    famousEvent: null
  };
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value._d,
    });
  }

  onStartChange = (value) => {
  

    const message = this.state.endValue != null &&  value != null ? Math.round((this.state.endValue  - value )/ (1000*60*60*24)) +' days': ''
    
    this.state.endValue !== null ? this.showGapMessage(message) : ''


    this.onChange('startValue', value);

    whatHappenedThisDay(value._d).then( newValue =>{
      this.onChange('famousEvent',newValue )
      NotificationManager.info(this.state.famousEvent, "What happened on this day?" ,25000);
    })
    
    value._d !== null ? NotificationManager.warning(isLeapYear(value._d.getFullYear(), "Start year"), "")  : ''
  }

  onEndChange = (value) => {
    this.onChange('endValue', value)

    const message = this.state.startValue != null &&  value != null ? Math.round((value - this.state.startValue )/ (1000*60*60*24)) +' days': ''
    
    this.state.startValue !== null ? this.showGapMessage(message) : ''

    value._d !== null &&  value._d ?  NotificationManager.warning(isLeapYear(value._d.getFullYear(), "End year"), "")  : ''
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true })
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open })
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    }); 
  }

  showGapMessage(message) {
    NotificationManager.success(message, 'Size of the gap',);
  }

  render() {
    const { startValue, endValue, endOpen , famousEvent} = this.state;
  
   
    return (
      <div className="App">
        <header>      
          <h1 >Please select a start and end date below</h1>
        </header>
        <div>
          <DatePicker
            disabledDate={this.disabledStartDate}
            showTime
            format={dateFormat}
            value={startValue}
            placeholder="Start"
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
          />
          <DatePicker
            disabledDate={this.disabledEndDate}
            showTime
            format={dateFormat}
            value={endValue}
            placeholder="End"
            onChange={this.onEndChange}
            open={endOpen}
            onOpenChange={this.handleEndOpenChange}
          />
        </div>
        <Card style={{ width: 300 , marginLeft:'auto', marginRight:'auto', marginTop: 50}}>
          <h4>
            Information box
          </h4>
          <p>   {startValue != null &&  endValue != null  ? "Time between dates  = " +  Math.round((endValue - startValue )/ (1000*60*60*24)) + ' days' : ''}</p>
          <p>   {startValue != null ?  isLeapYear(startValue._d.getFullYear(), '')  : ''}</p>
          <p>   {endValue != null  ?  isLeapYear(endValue._d.getFullYear(), '')  : ''}</p>
          <p> {  famousEvent != null ?  famousEvent : ''}</p>
        </Card>
        <NotificationContainer/>
      </div>
    );
  }
}

export default App;

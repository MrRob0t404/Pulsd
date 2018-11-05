import React, { Component } from 'react';
import TimezonePicker from 'react-timezone';

import axios from 'axios'
import { throws } from 'assert';

class App extends Component {
  constructor() {
    super()
    this.state = {
      eventName: '',
      description: '',
      price: 0,
      timezone: ''
    }
  }

  submit = () => {
    const { eventName, timezone, description, price, starttime, endtime, startdate, enddate } = this.state
    //ISO8601 date format 
    let eventStart = startdate + 'T' + starttime
    let eventEnd = enddate + 'T' + endtime
    axios
      .post('/submitEvent', {
        product_name: eventName,
        product_description: description,
        price: price,
        starttime: eventStart,
        endtime: eventEnd,
        timezone: timezone
      })
      .then(() => {
        this.setState({
          message: 'event submitted',
          eventName: '',
          description: '',
          price: 0,
          timezone: '',
          starttime: '',
          endtime: ''
        })
      })
      .catch(err => {
        this.setState({
          message: 'Something went wrong try again later'
        })
      })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        Event Name: <input
          value={this.state.eventName}
          type='text'
          placeholder='Event Name '
          onChange={this.handleChange}
          name='eventName'
        />
        {' '}
        <br />
        Description: <input
          value={this.state.description}
          type='text'
          placeholder='Description'
          onChange={this.handleChange}
          name='description'
        />
        <br />
        To the nearest cent:
        <input
          value={this.state.price}
          type='number'
          min='0'
          step='0.01'
          data-number-to-fixed='2'
          data-number-stepfactor='100'
          onChange={this.handleChange}
          name='price'
        /> <br />
        Start Date:<input type='date' onChange={this.handleChange} name='startdate' />  <br />
        End Date:<input type='date' onChange={this.handleChange} name='enddate' />
        <br />
        Select a start time: <input type="time" name="starttime" onChange={this.handleChange}></input>
        <br />
        Select an end time: <input type="time" name="endtime" onChange={this.handleChange}></input>
        <br></br>
        Select Timezone: <TimezonePicker
          value={this.state.timezone}
          onChange={timezone => this.setState({ timezone: timezone, value: timezone })}
          inputProps={{
            placeholder: 'Select Timezone...',
            name: 'timezone',
          }}
        />
        <br />
        <button onClick={this.submit}>Submit</button>
        {this.state.message}
      </div>
    )
  }
}

export default App

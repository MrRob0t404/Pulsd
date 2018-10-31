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
    const { eventName, timezone, description, price } = this.state
    axios
      .post('/submitEvent', {
        product_name: eventName,
        description: description,
        price: price,
        timezone: timezone
      })
      .then(() => {
        this.setState({
          message: 'event submitted',
          eventName: '',
          description: '',
          price: 0,
          timezone: ''
        })
      })
      .catch(err => {
        this.setState({
          message: err
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
          type='text'
          placeholder='Event Name '
          onChange={this.handleChange}
          name='eventName'
        />
        {' '}
        <br />
        Description: <input
          type='text'
          placeholder='Description'
          onChange={this.handleChange}
          name='description'
        />
        <br />
        To the nearest cent:
        <input
          type='number'
          min='0'
          step='0.01'
          data-number-to-fixed='2'
          data-number-stepfactor='100'
          onChange={this.handleChange}
          name='price'
        />
        <br />
        Select a start time: <input type="time" name="startTime" onChange={this.handleChange}></input>
        <br />
        Select an end time: <input type="time" name="endTime" onChange={this.handleChange}></input>
        <br></br>
        Select Timezone: <TimezonePicker
          value="Asia/Yerevan"
          onChange={timezone => this.setState({ timezone: timezone })}
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

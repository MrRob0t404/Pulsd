import React, { Component } from 'react'

import axios from 'axios'

class App extends Component {
  constructor () {
    super()
    this.state = {
      eventName: '',
      description: '',
      price: 0
    }
  }

  submit = () => {
    const { eventName, description, price } = this.state
    axios
      .post('/submitEvent', {
        product_name: eventName,
        description: description,
        price: price
      })
      .then(() => {
        this.setState({
          message: 'event submitted',
          eventName: '',
          description: '',
          price: 0
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

  render () {
    console.log(this.state)
    return (
      <div>
        <input
          type='text'
          placeholder='Event Name '
          onChange={this.handleChange}
          name='eventName'
        />
        {' '}
        <br />
        <input
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
          class='currency'
          onChange={this.handleChange}
          name='price'
        />
        {' '}
        <button onClick={this.submit}>Submit</button>
        {this.state.message}
      </div>
    )
  }
}

export default App

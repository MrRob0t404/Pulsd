import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render () {
    return (
      <div>
        <input type='text' placeholder='Event Name ' /> <br />
        <input type='text' placeholder='Description' /><br />
        <input type='text' placeholder='Price' /><br />
      </div>
    )
  }
}

export default App

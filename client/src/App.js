import React, { Component } from 'react'

import ExampleList from './example/ExampleList'
import TimeRemaining from './components/CampaignCard/TimeRemaining'

import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <ExampleList />
      </div>
    )
  }
}

export default App

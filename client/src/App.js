import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'
import NewCampaignPage from './pages/NewCampaignPage'
import ExampleFormPage from './pages/ExampleFormPage'
import './App.css'
import Header from './components/header/Header'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Router>
          <Header />
          <Route exact path='/' component={HomePage} />
          <Route path='/campaigns/:id' component={DetailsPage} />
          <Route path='/newcampaign' component={NewCampaignPage} />
          <Route path='/exampleform' component={ExampleFormPage} />
        </Router>
      </div>
    )
  }
}

export default App

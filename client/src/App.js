import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'
import NewCampaignPage from './pages/NewCampaignPage'
import ExampleFormPage from './pages/ExampleFormPage'
import PledgePage from './pages/PledgePage'
import PledgeConfirmationPage from './pages/PledgeConfirmationPage'
import './App.css'
import Header from './components/header/Header'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Router>
          <Header />
          <Route exact path='/' component={HomePage} />
          <Route exact path='/campaigns/:id/pledge' component={PledgePage} />
          <Route exact path='/campaigns/:id' component={DetailsPage} />
          <Route path='/newcampaign' component={NewCampaignPage} />
          <Route path='/exampleform' component={ExampleFormPage} />
          <Route path='/campaigns/:id/confirm' component={PledgeConfirmationPage} />
        </Router>
      </div>
    )
  }
}

export default App

import React from 'react'
import Header from '../components/header/Header'
import CampaignList from '../components/campaign/CampaignList'

class HomePage extends React.Component {
  render () {
    return <div className={'home-page-container'}>
      <Header />
      <CampaignList />
    </div>
  }
}

export default HomePage

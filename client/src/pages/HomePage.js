import React from 'react'
import CampaignList from '../components/campaign/CampaignList'
import './HomePage.css'

class HomePage extends React.Component {
  render () {
    return <div className={'home-page-container'}>
      <CampaignList />
    </div>
  }
}

export default HomePage

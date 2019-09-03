import React from 'react'
import { List, Spin } from 'antd'
import { getCampaigns } from '../../api'
import CampaignCard from './CampaignCard'

import './Campaign.css'
import CampaignFilters from '../filters/CampaignFilters'

class CampaignList extends React.Component {
  state = {
    loading: true,
    campaigns: [],
    filters: []
  }

  async componentDidMount () {
    const campaigns = await getCampaigns()
    // all of the locations existing in the campaigns
    const locations = ['Albany Event', 'Hoyts Sylvia Park']
    // all of the genres existing in the campaigns
    const genres = ['Action', 'Comedy', 'Drama']
    // the different cinema types, iMax, iMax 3D etc
    const screenTypes = [...new Set(campaigns.map(x => x.screenType))]

    this.setState({
      campaigns: campaigns,
      loading: false,
      locations: locations,
      genres: genres,
      screenTypes: screenTypes
    })
  }

  handleFilterChange = (filters) => {
    this.setState({ filters })
  }

  render () {
    const { loading, campaigns, locations, genres, screenTypes, filters } = this.state
    const filteredCampaigns = filters.length === 0
      ? campaigns
      : campaigns.filter(campaign => {
        let match = false
        filters.forEach(f => {
        // for each filter, access the campaign's corresponding value
        // to check if the value matches the selected filter
          if (campaign[f.property] === f.value) {
            match = true
          }
        })
        return match
      })

    return loading ? <Spin /> : (
      <div>
        <div className='sub-header'>
          <CampaignFilters
            locations={locations}
            genres={genres}
            screenTypes={screenTypes}
            onFilterChange={this.handleFilterChange}
          />
        </div>
        <div className='campaigns-container'>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 4,
              xxl: 5
            }}
            dataSource={filteredCampaigns}
            // renderItem is called with each element in dataSource (which in this case are campaigns).
            // Passing the campaign into a campaign card component will render that specific campaign
            renderItem={campaign => (
              <List.Item>
                <CampaignCard campaign={campaign} />
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }
}

export default CampaignList

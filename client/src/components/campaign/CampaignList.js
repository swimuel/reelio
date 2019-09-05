import React from 'react'
import { List, Spin, Button } from 'antd'
import { getCampaigns } from '../../api'
import CampaignCard from './CampaignCard'

import './Campaign.css'
import CampaignFilters from '../filters/CampaignFilters'
import SearchBar from '../search/SearchBar'
import { Link } from 'react-router-dom'

class CampaignList extends React.Component {
  state = {
    loading: true,
    campaigns: [],
    filters: {},
    searchTerm: ''
  }

  async componentDidMount () {
    const campaigns = await getCampaigns()
    // all of the locations existing in the campaigns
    const locations = ['Albany Event', 'Hoyts Sylvia Park']
    // all of the genres existing in the campaigns
    const genres = [...new Set(campaigns.map(x => x.genre))]
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

  handleSearch = (value) => {
    this.setState({ searchTerm: value })
  }

  handleFilterChange = (filters) => {
    this.setState({ filters })
  }

  getFilteredAndSearchedCampaigns = () => {
    const { filters, campaigns, searchTerm } = this.state

    let filtered = null
    if (Object.keys(filters).length === 0) {
      filtered = campaigns
    } else {
      filtered = campaigns.filter(campaign => {
        // filter should be an OR within categories,
        // and an AND between categories.
        let match = true
        Object.keys(filters).forEach(property => {
          let matchWithinProperty = false
          filters[property].forEach(value => {
            if (campaign[property] === value) {
              // this campaign matches a value within this filter property
              matchWithinProperty = true
            }
          })
          if (!matchWithinProperty) {
            match = false
          }
        })
        return match
      })
    }

    let searched = null
    if (searchTerm) {
      searched = filtered.filter(campaign => {
        const lowercaseSearch = searchTerm.toLowerCase()
        return campaign.filmTitle.toLowerCase().includes(lowercaseSearch) ||
        campaign.campaignTitle.toLowerCase().includes(lowercaseSearch)
      })
    } else {
      searched = filtered
    }

    return searched
  }

  render () {
    const { loading, locations, genres, screenTypes } = this.state
    const filteredCampaigns = this.getFilteredAndSearchedCampaigns()

    return loading ? <Spin /> : (
      <div>
        <div className='sub-header'>
          <div className='left'>
            <Link to='/newcampaign'><Button >Create Campaign</Button></Link>
          </div>
          <div className='right'>
            <CampaignFilters
              locations={locations}
              genres={genres}
              screenTypes={screenTypes}
              onFilterChange={this.handleFilterChange}
            />
            <SearchBar onSearch={this.handleSearch} />
          </div>
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

import React from 'react'
import { List, Spin, Button } from 'antd'
import { getCampaigns } from '../../api'
import CampaignCard from './CampaignCard'
import moment from 'moment'
import './Campaign.css'
import CampaignFilters from '../filters/CampaignFilters'
import SearchBar from '../search/SearchBar'
import { Link } from 'react-router-dom'
import DateRangeFilter from '../filters/DateRangeFilter'

class CampaignList extends React.Component {
  state = {
    loading: true,
    campaigns: [],
    filters: {},
    searchTerm: '',
    dateFilter: {
      startDate: null,
      endDate: null
    }
  }

  async componentDidMount () {
    const campaigns = await getCampaigns()
    // all of the cinemas existing in the campaigns
    const cinemas = [...new Set(campaigns.map(x => x.cinemaName))]
    // all of the genres existing in the campaigns
    const genres = [...new Set(campaigns.map(x => x.genre).reduce((allGenres, currentGenre) => {
      return [...allGenres, ...currentGenre]
    }))]
    // the different cinema types, iMax, iMax 3D etc
    const screenTypes = [...new Set(campaigns.map(x => x.screenType))]

    this.setState({
      campaigns: campaigns,
      loading: false,
      cinemas: cinemas,
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
    const { filters, campaigns, searchTerm, dateFilter } = this.state

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
            if (Array.isArray(campaign[property])) {
              if (campaign[property].includes(value)) {
                // this campaign matches a value within this filter property
                matchWithinProperty = true
              }
            } else {
              if (campaign[property] === value) {
                // this campaign matches a value within this filter property
                matchWithinProperty = true
              }
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

    // ensure campaigns are within date range
    const { startDate, endDate } = dateFilter
    searched = searched.filter(campaign => {
      const date = moment(campaign.screeningDate)
      if (startDate && endDate) {
        return date.isSameOrAfter(startDate, 'day') && date.isSameOrBefore(endDate, 'day')
      } else if (startDate && !endDate) {
        // any campaign after start date is valid
        return date.isSameOrAfter(startDate, 'day')
      } else if (!startDate && endDate) {
        // any campaign before end date is valid
        return date.isSameOrBefore(endDate, 'day')
      } else {
        // no filter applied so any campaign is ok
        return true
      }
    })

    return searched
  }

handleDateRangeChange = ({ startDate, endDate }) => {
  this.setState({ dateFilter: { startDate, endDate } })
}

render () {
  const { loading, cinemas, genres, screenTypes } = this.state
  const filteredCampaigns = this.getFilteredAndSearchedCampaigns()

  return loading ? <Spin /> : (
    <div>
      <div className='sub-header'>
        <div className='left'>
          <Link to='/newcampaign'><Button >Create Campaign</Button></Link>
        </div>
        <div className='right'>
          <DateRangeFilter onChange={this.handleDateRangeChange} />
          <CampaignFilters
            cinemas={cinemas}
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
            gutter: 10,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 4,
            xl: 4,
            xxl: 6
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

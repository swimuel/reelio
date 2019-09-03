import React from 'react'
import { List, Spin, TreeSelect } from 'antd'
import { getCampaigns } from '../../api'
import CampaignCard from './CampaignCard'

import './Campaign.css'
const moment = require('moment')
const { TreeNode } = TreeSelect

class CampaignList extends React.Component {
  state = {
    loading: true,
    campaigns: [],
    value: undefined
  }

  async componentDidMount () {
    const campaigns = await getCampaigns()
    // const locations (all of the locations existing in the campaigns)
    const locations = ['Albany Event', 'Hoyts Sylvia Park']
    // const genres (all of the genres existing in the campaigns)
    const genres = ['Action', 'Comedy', 'Drama']
    // const times (range of dates between first and last campaign?)
    const times = [...new Set(campaigns.map(x => x.screeningDate))]
    console.log(times)
    // const types (the different cinema types, iMax, iMax 3D etc)
    const types = [...new Set(campaigns.map(x => x.screenType))]
    console.log(types)
    this.setState({
      campaigns: campaigns,
      loading: false,
      locations: locations,
      genres: genres,
      times: times,
      types: types
    })
  }

  render () {
    const { loading, campaigns, locations, genres, times, types, value } = this.state
    return loading ? <Spin /> : (
      <div>
        <div className='sub-header'>
          <div className='campaigns-filter'>
            <TreeSelect
              showSearch
              multiple
              treeDefaultExpandAll
              allowClear
              value={value}
              placeholder='Filter'
              style={{ width: 300 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              onChange={(value) => {
                this.setState({ value: value })
              }}
            >
              <TreeNode selectable={false} value='locations' title='Locations'>
                {locations.map(x =>
                  <TreeNode value={x} title={x} />)}
              </TreeNode>
              <TreeNode selectable={false} value='genres' title='Genres'>
                {genres.map(x =>
                  <TreeNode value={x} title={x} />)}
              </TreeNode>
              <TreeNode selectable={false} value='times' title='Times'>
                {times.map(x =>
                  <TreeNode value={x} title={moment(x).format('Do MMMM')} />)}
              </TreeNode>
              <TreeNode selectable={false} value='types' title='Types'>
                {types.map(x =>
                  <TreeNode value={x} title={x} />)}
              </TreeNode>
            </TreeSelect>
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
            dataSource={campaigns}
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

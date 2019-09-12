import React from 'react'
import { Card } from 'antd'
import MovieSearch from '../components/movie/MovieSearch'

class NewCampaignPage extends React.Component {
  render () {
    return (
      <div>
        <Card>
          <MovieSearch />
        </Card>
      </div >
    )
  }
}
export default NewCampaignPage

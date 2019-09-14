import React from 'react'
import { Card } from 'antd'
import MovieSearch from '../components/movie/MovieSearch'
import ScreenTypeForm from '../components/form/ScreenTypeForm'

class NewCampaignPage extends React.Component {
  render () {
    return (
      <div>
        <Card>
          <MovieSearch />
          <ScreenTypeForm />
        </Card>
      </div >
    )
  }
}
export default NewCampaignPage

import React from 'react'
import { Row, Col, Icon, Card } from 'antd'
import MovieSearchClass from '../components/movie/MovieSearch'
import { Link } from 'react-router-dom'
import './NewCampaignPage.css'
import NewCampaignForm from '../components/form/NewCampaignForm'

class NewCampaignPage extends React.Component {

  state = {
    CampaignForm: null,
    MovieSearchForm: null,
  };

  render () {
    return (
      <div>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              <Link to='/'><Icon type='arrow-left' style={styles.backButton} /></Link>
              <h2 style={{ fontSize: '2em' }}>Create Campaign</h2>
            </Card>
          </Col>
        </Row>
        <div className={'form-container'}>
          <div className={'custom-col-1'}>
            <Card bordered={false} style={styles.cardBorder}>
              <NewCampaignForm sendDetails = {this.fromCampaignForm} />
            </Card>
          </div>
          <div className={'custom-col-2'}>
            <Card bordered={false}>
              <h2>Movie</h2>
              <MovieSearchClass sendDetails = {this.fromMovieSearch} />
            </Card>
          </div>
        </div>
      </div>
    )
  }

  fromCampaignForm = (formData) => {
    console.log('formData', formData);
    this.setState({CampaignForm: formData})
  }

  fromMovieSearch = (searchResults) => {
    console.log('searchResults', searchResults);
    this.setState({MovieSearchForm: searchResults})
  }

  saveCampaign() {
    // need to get movie search result before other form!! somehow
  }

}
export default NewCampaignPage

const styles = {
  backButton: {
    float: 'left',
    fontSize: '2em',
    color: '#FF6852'
  },

  cardBorder: {
    borderRight: '1px solid #E8E8E8'
  }
}

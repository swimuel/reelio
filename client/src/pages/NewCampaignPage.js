import React from 'react'
import { Row, Col, Icon, Card } from 'antd'
import MovieSearch from '../components/movie/MovieSearch'
import { Link } from 'react-router-dom'
import './NewCampaignPage.css'
import GeneralDetailsForm from '../components/form/GeneralDetailsForm'

class NewCampaignPage extends React.Component {
  render() {
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
              <GeneralDetailsForm />
            </Card>
          </div>
          <div className={'custom-col-2'}>
            <Card bordered={false}>
            <h2>Movie</h2>
              <MovieSearch />
            </Card>
          </div>
        </div>
      </div>
    )
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

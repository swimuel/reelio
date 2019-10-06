import React from 'react'
import { Row, Col, Icon, Card, Modal, Button } from 'antd'
import MovieSearchClass from '../components/movie/MovieSearch'
import { Link } from 'react-router-dom'
import './NewCampaignPage.css'
import NewCampaignForm from '../components/form/NewCampaignForm'
import { createCampaign, getMoviesByID, createPledge } from '../api'

class NewCampaignPage extends React.Component {
  state = {
    CampaignForm: null,
    PledgeForm: null,
    MovieSearchForm: null,
    CanSubmitForm: false,
    showConfirmation: false,
    createdCampaignId: null,
    numTicketsPledged: null
  };

  render () {
    return (
      <div>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              <Link to='/'><Icon type='arrow-left' style={styles.backButton} /></Link>
              <div style={styles.heading}>
                Create Campaign
              </div>
            </Card>
          </Col>
        </Row>
        <div className={'form-container'}>
          <div className={'custom-col-1'}>
            <Card bordered={false} style={styles.cardBorder}>
              <NewCampaignForm sendDetails={this.fromCampaignForm} canSubmit={this.state.CanSubmitForm} />
            </Card>
          </div>
          <div className={'custom-col-2'}>
            <Card bordered={false}>
              <h2>Movie</h2>
              <MovieSearchClass sendDetails={this.fromMovieSearch} triggerValidation={!this.state.CanSubmitForm} />
            </Card>
          </div>
        </div>
        <Modal
          visible={this.state.showConfirmation}
          title={'Campaign successfully created!'}
          closable={false}
          footer={<Button type='primary' onClick={this.goToCreatedCampaign}>Go to campaign</Button>}
        >{this.state.showConfirmation &&
          `You have pledged ${this.state.numTicketsPledged}
           ${this.state.numTicketsPledged > 1 ? 'tickets' : 'ticket'} 
        towards a screening of
          ${this.state.MovieSearchForm.movie.Title}`}
        </Modal>
      </div>
    )
  }

  fromCampaignForm = (formData) => {
    this.setState({ CampaignForm: formData }, () => {
      this.saveData()
    })
  }

  fromMovieSearch = (searchResults) => {
    this.setState({ MovieSearchForm: searchResults }, () => {
      if (!searchResults) {
        this.setState({ CanSubmitForm: false })
      } else {
        const movieInfo = getMoviesByID(this.state.MovieSearchForm.key)
        movieInfo.then(info => {
          this.setState({ MovieSearchForm: { ...searchResults, movie: info } })
        })
        this.setState({ CanSubmitForm: true })
      }
    })
  }

  goToCreatedCampaign = () => {
    this.props.history.push(`/campaigns/${this.state.createdCampaignId}`)
  }

  saveData = () => {
    const movie = this.state.MovieSearchForm.movie
    const campaign = {
      filmTitle: movie.Title,
      campaignTitle: this.state.CampaignForm.campaignTitle,
      creationDate: this.state.CampaignForm.creationDate,
      screeningDate: this.state.CampaignForm.screeningDate,
      screeningTime: this.state.CampaignForm.screeningTime,
      screenType: this.state.CampaignForm.screenType,
      imageUrl: movie.Poster,
      genre: movie.Genre,
      creatorName: this.state.CampaignForm.creatorName,
      creatorEmail: this.state.CampaignForm.creatorEmail,
      cinemaName: this.state.CampaignForm.cinemaName,
      cinemaAddress: this.state.CampaignForm.cinemaAddress,
      adultPrice: this.state.CampaignForm.adultPrice,
      childPrice: this.state.CampaignForm.childPrice,
      imdbID: this.state.MovieSearchForm.key
    }

    // Call api to store the new campaign in the back end
    createCampaign(campaign).then(created => {
      const id = created.data._id
      this.setState({ showConfirmation: true, createdCampaignId: id, numTicketsPledged: this.state.CampaignForm.ticketsPledged })
      console.log('successfully pushed campaign with id', id)

      const pledge = {
        name: this.state.CampaignForm.name,
        email: this.state.CampaignForm.email,
        campaign: id,
        ticketsPledged: this.state.CampaignForm.ticketsPledged,
        creditCardNumber: this.state.CampaignForm.creditCardNumber,
        creditCardExpiry: this.state.CampaignForm.creditCardExpiry,
        creditCardCVV: this.state.CampaignForm.creditCardCVV,
        creditCardName: this.state.CampaignForm.creditCardName
      }
      console.log('pledge = ', pledge)

      createPledge(pledge)
    })
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
  },

  heading: {
    fontSize: '3.3em',
    fontWeight: 'bold'
  }
}

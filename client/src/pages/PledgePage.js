import React, { Component } from 'react'
import { Row, Col, Icon, Card, Spin, Modal, Button } from 'antd'
import { Link } from 'react-router-dom'
import { getCampaignById, createPledge } from '../api'
import PledgeDetails from '../components/pledge/PledgeDetails'
import PledgeForm from '../components/form/PledgeForm'
import './NewCampaignPage.css'

class PledgePage extends Component {
  state = {
    campaign: null,
    loading: true,
    PledgeForm: null,
    showConfirmation: false,
    createdPledgeId: null,
    pledgeCampaign: null,
    restrictedConfirmation: false
  }

  async componentDidMount () {
    const id = this.props.match.params.id
    const campaign = await getCampaignById(id)
    this.setState(
      {
        campaign: campaign,
        loading: false,
        restrictedConfirmation: campaign.rated === 'R' || campaign.rated === 'PG-13' })
  }

  render () {
    const { campaign } = this.state

    return this.state.loading ? <Spin /> : (
      <div>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              <Link to={`/campaigns/${campaign._id}`}><Icon type='arrow-left' style={styles.backButton} /></Link>
              <div style={styles.heading}>
                Pledge to '{campaign.campaignTitle}'
              </div>
              <Icon type='arrow-left' style={styles.backButton2} />
              <div style={styles.heading2}>
                A screening of {campaign.filmTitle} (Rated: {campaign.rated})
              </div>
              {campaign.rated === 'R'
                ? <div>
                  You must be at least 16 years old to watch this movie
                </div>
                : null
              }
              {campaign.rated === 'PG-13'
                ? <div>
                  Minors under 13 must be accompanied by an adult
                </div>
                : null}
            </Card>
          </Col>
        </Row>
        <div className={'details-container'}>
          <div className={'custom-col-1'}>
            <Card bordered={false} style={styles.cardBorder}>
              <PledgeForm sendDetails={this.fromPledgeForm} campaign={this.state.campaign} />
            </Card>
          </div>
          <div className={'custom-col-2'}>
            <PledgeDetails id={campaign._id} imdbID={campaign.imdbID} />
          </div>
        </div>
        <Modal
          visible={this.state.showConfirmation}
          title={'Pledge successful!'}
          closable={false}
          footer={<Button type='primary' onClick={this.goToCreatedCampaign}>Go to campaign</Button>}
        >{this.state.showConfirmation &&
        `You have pledged ${this.state.PledgeForm.ticketsPledged}
           ${this.state.PledgeForm.ticketsPledged > 1 ? 'tickets' : 'ticket'} 
           towards a screening of
          ${this.state.campaign.filmTitle}`}
        </Modal>
        <Modal
          visible={this.state.restrictedConfirmation}
          title={'Age Restriction'}
          closable={false}
          footer={
            <div style={styles.restricted}>
              <Button style={styles.yesButton} type='primary' onClick={this.confirmAge}>Yes</Button>
              <Button href={`/`}>No</Button>
            </div>}
          style={styles.restrictedModal}
        >
          {
            campaign.rated === 'R' ? 'Are you over 16 years old?' : 'Are you over 13 years old?'
          }
        </Modal>
      </div>
    )
  }

  fromPledgeForm = (formData) => {
    this.setState({ PledgeForm: formData }, () => {
      this.saveData()
    })
  }

  saveData = () => {
    const pledge = {
      name: this.state.PledgeForm.name,
      email: this.state.PledgeForm.email,
      campaign: this.state.campaign._id,
      ticketsPledged: this.state.PledgeForm.ticketsPledged,
      creditCardNumber: this.state.PledgeForm.creditCardNumber,
      creditCardExpiry: this.state.PledgeForm.creditCardExpiry,
      creditCardCVV: this.state.PledgeForm.creditCardCVV,
      creditCardName: this.state.PledgeForm.creditCardName
    }

    // Call api to store the new pledge in the back end
    createPledge(pledge).then(created => {
      const id = created.data._id
      this.setState({ showConfirmation: true, createdPledgeId: id, pledgeCampaign: created.data.campaign })
    })
  }

  goToCreatedCampaign = () => {
    this.props.history.push(`/campaigns/${this.state.pledgeCampaign}/confirm`)
  }

  confirmAge = () => {
    this.setState({
      restrictedConfirmation: false
    })
  }
}

export default PledgePage

const styles = {
  backButton: {
    float: 'left',
    fontSize: '2em',
    color: '#FF6852'
  },

  backButton2: {
    float: 'left',
    fontSize: '2em',
    color: '#FFFFFF'
  },

  cardBorder: {
    borderRight: '1px solid #E8E8E8'
  },

  heading: {
    fontSize: '3.3em',
    fontWeight: 'bold'
  },

  heading2: {
    fontSize: '2em',
    fontWeight: 'bold'
  },

  restricted: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },

  restrictedModal: {
    textAlign: 'center'
  },

  yesButton: {
    marginRight: '2%'
  }
}

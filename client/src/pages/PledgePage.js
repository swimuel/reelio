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
    pledgeCampaign: null
  }

  async componentDidMount () {
    const id = this.props.match.params.id
    const campaign = await getCampaignById(id)
    this.setState({ campaign: campaign, loading: false })
  }

  render () {
    const { campaign } = this.state

    return this.state.loading ? <Spin /> : (
      <div>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              <Link to={`/campaigns/${campaign._id}`}><Icon type='arrow-left' style={styles.backButton} /></Link>
              <h1 style={{ fontSize: '2.8em' }}>Pledge to '{campaign.campaignTitle}'</h1>
              <Icon type='arrow-left' style={styles.backButton2} />
              <h1>A screening of {campaign.filmTitle}</h1>
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
      // this.props.history.push(`/campaigns/${created.data.campaign}/confirm`)
    })
  }
  goToCreatedCampaign = () => {
    this.props.history.push(`/campaigns/${this.state.pledgeCampaign}`)
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
  }
}

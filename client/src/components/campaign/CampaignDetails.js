import React from 'react'
import { Icon, Tag } from 'antd'
const moment = require('moment')

class CampaignDetails extends React.Component {
  render () {
    const { campaign } = this.props

    return (
      <div style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px', margin: 'auto', textAlign: 'left', width: 'fit-content' }}>
        <Tag style={styles.tag}>{ campaign.screenType }</Tag>
        <h2 style={styles.h2}><Icon type='compass' style={styles.icon} /> { campaign.cinemaName }</h2>
        <h2 style={styles.h2}><Icon type='calendar' style={styles.icon} /> { moment(campaign.screeningDate).format('MMMM Do YYYY') }</h2>
        <h2 style={styles.h2}><Icon type='clock-circle' style={styles.icon} /> { moment(campaign.screeningDate).format('h:mm a') }</h2>
        <h2 style={styles.h2}><Icon type='dollar' style={styles.icon} /> ${ campaign.price }.00</h2>
        <br />
        <h3>Organiser: {campaign.creatorName} </h3>
      </div>
    )
  }
}

export default CampaignDetails

const styles = {
  h2: {
    fontSize: 20
  },
  icon: {
    marginRight: 30
  },
  tag: {
    marginBottom: 30,
    fontSize: 20,
    padding: 5
  }
}

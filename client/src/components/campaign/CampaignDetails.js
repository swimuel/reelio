import React from 'react'
import { Icon, Tag, Button, Popover } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
const moment = require('moment')

class CampaignDetails extends React.Component {
  render () {
    const { campaign } = this.props
    const url = window.location.href

    return (
      <div style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px', margin: 'auto', textAlign: 'left', width: 'fit-content' }}>
        <Tag style={styles.tag}>{ campaign.screenType }</Tag>
        <h2 style={styles.h2}><Icon type='compass' style={styles.icon} /> { campaign.cinemaName }</h2>
        <h2 style={styles.h2}><Icon type='calendar' style={styles.icon} /> { moment(campaign.screeningDate).format('MMMM Do YYYY') }</h2>
        <h2 style={styles.h2}><Icon type='clock-circle' style={styles.icon} /> { campaign.screeningTime }</h2>
        <h2 style={styles.h2}><Icon type='dollar' style={styles.icon} /> ${ campaign.price }.00</h2>
        <h3 style={styles.h3}>Organiser: {campaign.creatorName} </h3>
        <CopyToClipboard text={url}>
          <Popover content='Link copied!' trigger='click'>
            <Button size='large' style={styles.h3}>Share <Icon type='share-alt' /></Button>
          </Popover>
        </CopyToClipboard>
      </div>
    )
  }
}

export default CampaignDetails

const styles = {
  h2: {
    fontSize: 20
  },
  h3: {
    fontSize: 16,
    marginTop: 50
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

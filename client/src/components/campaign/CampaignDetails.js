import React from 'react'
import { Icon, Tag, Button, Popover } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  LinkedinShareButton, LinkedinIcon,
  EmailShareButton, EmailIcon } from 'react-share'
const moment = require('moment')
const divStyle = {
  display: 'flex',
  alignItems: 'center'
}

class CampaignDetails extends React.Component {
  state = {
    url: 'https://www.imdb.com/title/' + this.props.campaign.imdbID,
    shareSentence: 'Hi there! I\'d love to share a new campaign I\'m running, to watch a movie I love (' + this.props.campaign.filmTitle + ')!\n' +
    'The campaign link is: ' + window.location.href
  }

  render () {
    const { campaign } = this.props

    return (
      <div style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px', margin: 'auto', textAlign: 'left', width: 'fit-content' }}>
        <Tag style={styles.tag}>{ campaign.screenType }</Tag>
        <h2 style={styles.h2}><Icon type='compass' style={styles.icon} /> { campaign.cinemaName }</h2>
        <h2 style={styles.h2}><Icon type='calendar' style={styles.icon} /> { moment(campaign.screeningDate).format('MMMM Do YYYY') }</h2>
        <h2 style={styles.h2}><Icon type='clock-circle' style={styles.icon} /> { campaign.screeningTime }</h2>
        <h2 style={styles.h2}><Icon type='dollar' style={styles.icon} /> ${ campaign.price }.00</h2>
        <h3 style={styles.h3}>Organiser: {campaign.creatorName} </h3>
        <CopyToClipboard text={window.location.href}>
          <Popover content='Link copied!' trigger='click'>
            <Button size='large' style={styles.copyLinkButton}>Copy Link <Icon type='share-alt' /></Button>
          </Popover>
        </CopyToClipboard>
        <div style={divStyle}>
          <FacebookShareButton style={styles.facebookShareButton} url={this.state.url} quote={this.state.shareSentence} className='share'>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <TwitterShareButton style={styles.twitterShareButton} url={this.state.url} title={this.state.shareSentence} className='share'>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <LinkedinShareButton style={styles.linkedinShareButton} url={this.state.url} quote={this.state.shareSentence} className='share'>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
          <EmailShareButton style={styles.emailShareButton} url={this.state.url} subject={'My new movie campaign!'} body={this.state.shareSentence + '\nSee the movie here:'} openWindow='true' className='share'>
            <EmailIcon size={40} round />
          </EmailShareButton>
        </div>
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
  },
  copyLinkButton: {
    fontSize: 16,
    marginTop: 50,
    width: 175
  },
  facebookShareButton: {
    marginTop: 10,
    marginLeft: 0
  },
  twitterShareButton: {
    marginTop: 10,
    marginLeft: 5
  },
  linkedinShareButton: {
    marginTop: 10,
    marginLeft: 5
  },
  emailShareButton: {
    marginTop: 10,
    marginLeft: 5
  }
}

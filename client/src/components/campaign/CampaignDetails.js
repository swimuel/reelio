import React from 'react'
const moment = require('moment')

class CampaignDetails extends React.Component {

    render () {
        const { campaign } = this.props

        return (
            <div>
                <h3>{ moment(campaign.screeningDate).format('MMMM Do YYYY, h:mm a') }</h3>
                <h3>Ticket price: ${ campaign.price }.00</h3>
                <h3>{ campaign.screenType }</h3>
                <h3>Organiser: { campaign.creatorName }</h3>
                <h3>{ campaign.cinemaName }</h3>
            </div>
        )
    }
}

export default CampaignDetails
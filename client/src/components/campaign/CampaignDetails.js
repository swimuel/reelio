import React from 'react'

class CampaignDetails extends React.Component {

    render () {
        const { campaign } = this.props

        return (
            <div>
                <h2>{ campaign.campaignTitle }</h2>
            </div>
        )
    }
}

export default CampaignDetails
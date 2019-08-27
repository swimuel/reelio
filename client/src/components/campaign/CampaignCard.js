import React from 'react'
import { Card, Progress } from 'antd'
import TimeRemaining from './TimeRemaining'

class CampaignCard extends React.Component {
  render () {
    const { Meta } = Card
    const { campaign } = this.props
    return (
      <Card
        hoverable
        style={{ width: 200, height: 440 }}
        // TODO: include image url in dto
        cover={<img alt='example' src='https://www.joblo.com/assets/images/joblo/posters/2019/04/avengers_endgame_ver44_xlg.jpg' width='200' />}
        // TODO: calculate string to pass into time remaining
        extra={<TimeRemaining time='1 day' />}
      >
        <Meta title={campaign.filmTitle} description={' (' + campaign.screenType + ')'} />
        <Progress percent={campaign.percentageComplete} />
      </Card>
    )
  }
}

export default CampaignCard

import React from 'react'
import { Card, Progress } from 'antd'
import TimeRemaining from './components/CampaignCard/TimeRemaining'

const CampaignCard = (campaign) => {
  const { Meta } = Card
  return (
    <Card
      hoverable
      style={{ width: 200, height: 440 }}
      cover={<img alt='example' src='https://www.joblo.com/assets/images/joblo/posters/2019/04/avengers_endgame_ver44_xlg.jpg' width='200' />}
      extra={<TimeRemaining time='1 day' />}
    >
      <Meta title={campaign.props.filmTitle} description={' (' + campaign.props.screenType + ')'} />
      <Progress percent={campaign.props.percentageComplete} />

    </Card>
  )
}

export default CampaignCard

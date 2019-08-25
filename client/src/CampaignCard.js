import React from 'react'
import { Card, Progress } from 'antd'
import TimeRemaining from './components/CampaignCard/TimeRemaining'

class CampaignCard extends React.Component {
  render () {
    const { Meta } = Card
    return (
      <Card
        hoverable
        style={{ width: 200, height: 440 }}
        cover={<img alt='example' src='http://www.impawards.com/2019/posters/avengers_endgame_ver2_xlg.jpg' width='200' />}
        extra={<TimeRemaining />}
      >
        <Meta title='Title of Movie' description='' />
        <Progress percent={75} />
      </Card>
    )
  }
}

export default CampaignCard

import React from 'react'
import { Card } from 'antd'

class CampaignCard extends React.Component {

  render() {
    const { Meta } = Card;
    return (
      <Card
    hoverable
    style={{ width: 200, height:380 }}
    cover={<img alt="example" src="http://www.impawards.com/2019/posters/avengers_endgame_ver2_xlg.jpg" width="200"/>}
  >
  <Meta title="Title of Movie" description="" />
      </Card>
  )
  }
}

export default CampaignCard
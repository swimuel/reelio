import React from 'react'

class DetailsPage extends React.Component {
  render () {
    const { match } = this.props // contains information from the router
    const { id } = match.params

    // TODO: render campaign details component and pass in id,
    // which then fetches more data for the campaign
    return <div>{id}</div>
  }
}

export default DetailsPage

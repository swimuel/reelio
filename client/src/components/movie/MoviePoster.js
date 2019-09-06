import React, { Component } from 'react'

import './MoviePoster.css'

class MoviePoster extends Component {
  render () {
    const poster = this.props.poster

    var divStyle = {
      backgroundImage: 'url(' + poster + ')'
    }

    return (
      <div className={'poster'} style={divStyle} />
    )
  }
}

export default MoviePoster

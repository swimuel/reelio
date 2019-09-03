import React, { Component } from 'react'

import './MovieInfo.css'

class MovieInfo extends Component {
  render () {
    const movieInfo = this.props.movieInfo

    return (
      <div className={'info-container'}>
        <div className={'heading'}>
          <text className={'title'}>
            {movieInfo.Title}
          </text>
          <text className={'rated'}>
            {movieInfo.Rated + '    ' + movieInfo.imdbRating + '/10.0'}
          </text>
        </div>
        <div className={'subtext-container'}>
          <div className={'subtext'}>
            {movieInfo.Year}
          </div>
          <div className={'subtext'}>
            {movieInfo.Production}
          </div>
          <div className={'subtext'}>
            {movieInfo.Runtime}
          </div>
        </div>
        <div className={'prod-team-container'}>
          <div className={'prod-member'}>
            {'Directors: ' + movieInfo.Director}
          </div>
          <div className={'prod-member'}>
            {'Writers: ' + movieInfo.Writer}
          </div>
          <div className={'prod-member'}>
            {'Cast: ' + movieInfo.Actors}
          </div>
        </div>
        <div className={'summary'}>
          {movieInfo.Plot}
        </div>
        <div className={'tags'}>
          {'Tags: ' + movieInfo.Genre}
        </div>
        <div className={'accolades-container'}>
          <div className={'accolade'}>
            {movieInfo.Metascore + ' Metascore'}
          </div>
          <div className={'accolade'}>
            {movieInfo.Awards}
          </div>
        </div>
      </div>
    )
  }
}

export default MovieInfo

import React, { Component } from 'react'

import { Spin } from 'antd'

import './MovieDetails.css'
import MovieInfo from './MovieInfo'
import MoviePoster from './MoviePoster'
import { getMoviesByID, getMoviesBySearch } from '../../api'

class MovieDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      movieInfo: null
    }
  }

  async componentDidMount () {
    const omdb = await getMoviesBySearch(this.props.title)
    const id = omdb[0].imdbID
    const movie = await getMoviesByID(id)

    this.setState({
      loading: false,
      movieInfo: movie
    })
  }

  render () {
    const loading = this.state.loading
    const movieInfo = this.state.movieInfo

    return loading ? <Spin /> : (
      <div className={'det-container'}>
        <div className={'custom-col-1'}>
          <MovieInfo movieInfo={movieInfo} />
        </div>
        <div className={'custom-col-2'}>
          <MoviePoster poster={movieInfo.Poster} />
        </div>
      </div>
    )
  }
}

export default MovieDetails

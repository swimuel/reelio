import React, { Component } from 'react'

import { Spin } from 'antd'

import './MovieDetails.css'
import MovieInfo from './MovieInfo'
import MoviePoster from './MoviePoster'
import { getMoviesByID } from '../../api'

class MovieDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      movieInfo: null
    }
  }

  async componentDidMount () {
    const movie = await getMoviesByID(this.props.imdbID)

    this.setState({
      loading: false,
      movieInfo: movie
    })
  }

  async componentDidUpdate (prevProps, prevState) {
    if (this.props.imdbID !== prevProps.imdbID) {
      const movie = await getMoviesByID(this.props.imdbID)

      this.setState({
        loading: false,
        movieInfo: movie
      })
    }
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

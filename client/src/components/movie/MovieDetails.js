import React, { Component } from 'react'

import { Row, Col, Spin } from 'antd'

import MovieInfo from './MovieInfo'
import MoviePoster from './MoviePoster'
import { getMoviesByID, getMoviesBySearch } from '../../api'

class MovieDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }

    this.movieInfo = {}
  }

  async componentDidMount () {
    const omdb = await getMoviesBySearch(this.props.title)
    const id = omdb[0].imdbID
    const movie = await getMoviesByID(id)

    this.movieInfo = movie

    this.setState({
      loading: false
    })
  }

  render () {
    const loading = this.state.loading
    const movieInfo = this.movieInfo

    return loading ? <Spin /> : (
      <Row type='flex' justify='end'>
        <Col span={8}>
          <MovieInfo movieInfo={movieInfo} />
        </Col>
        <Col span={8}>
          <MoviePoster poster={movieInfo.Poster} />
        </Col>
      </Row>
    )
  }
}

export default MovieDetails

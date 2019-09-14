import React from 'react'
import debounce from 'lodash/debounce'
import { AutoComplete, Spin } from 'antd'
import MovieDetails from './MovieDetails'
const { Option } = AutoComplete
const axios = require('axios')

class MovieSearch extends React.Component {
  constructor (props) {
    super(props)
    this.fetchMovie = debounce(this.fetchMovie, 800) // used to debounce the querying of the API (wait 800ms after user has stopped typing)
  }

  state = {
    data: [], // array of suggested movies
    value: [], // the input value in the autocomplete
    movieChosen: null, // the most recent movie selected
    fetching: false // used to render loading spin icon
  }

  fetchMovie = async (value) => {
    // trim and ' ' + occurrence replace in value
    const searchableValue = value.trim().replace(/ /g, '+')
    const movieData = (await axios.get('http://localhost:3000/api/omdb?search=' + searchableValue)).data

    // ensure unique movie search objects, based on imdbId (AutoComplete complains otherwise)
    const movies = new Map()
    const uniqueMovies = []
    for (const movie of movieData) {
      if (!movies.has(movie.imdbID)) {
        movies.set(movie.imdbID, true) // set any value to Map
        uniqueMovies.push({
          id: movie.imdbID,
          title: movie.Title,
          posterUrl: movie.Poster,
          year: movie.Year
        })
      }
    }

    this.setState({ data: uniqueMovies, fetching: false })
  }

  // If the user deletes all characters, clear the selection, otherwise let movieChosen remain what it was
  handleChange = value => {
    if (value === undefined || value.label === '') {
      this.setState({
        value,
        data: [],
        movieChosen: null,
        fetching: false
      })
    } else {
      this.setState({
        value,
        data: [],
        fetching: false
      })
    }
  }

  // Set movieChosen to most recently selected dropdown
  // option, and fill the dropdown field to be the movie name
  handleSelect = value => {
    this.setState({
      data: [],
      movieChosen: null,
      value: {
        key: value.key,
        label: value.label[2]
      },
      fetching: false
    })
    this.setState({
      data: [],
      movieChosen: value,
      value: {
        key: value.key,
        label: value.label[2]
      },
      fetching: false
    })
  }

  render () {
    const { fetching, data, value, movieChosen } = this.state
    return <div>
      <AutoComplete
        mode='multiple'
        allowClear
        dropdownMatchSelectWidth
        labelInValue
        value={value}
        placeholder='Search for a movie...'
        notFoundContent={fetching ? <Spin size='small' /> : null}
        filterOption={false}
        onSearch={this.fetchMovie}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        style={{ width: '50%', margin: '1em' }}
      >
        {data.map(movie => (
          <Option key={movie.id}>{movie.posterUrl !== 'N/A' && <img src={movie.posterUrl} width='75' />}&nbsp;&nbsp;&nbsp;&nbsp;{movie.title} <b>({movie.year})</b></Option>
        ))}
      </AutoComplete>
      {movieChosen && <MovieDetails imdbID={movieChosen.key} />}
    </div>
  }
}

export default MovieSearch

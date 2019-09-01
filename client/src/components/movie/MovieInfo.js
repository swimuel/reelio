import React, {Component} from 'react'

import './MovieInfo.css'

class MovieInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieId : props.movieId,
            movieInfo: {
                "Title": "The Incredibles",
                "Year": "2004",
                "Rated": "PG",
                "Released": "05 Nov 2004",
                "Runtime": "115 min",
                "Genre": "Animation, Action, Adventure, Family",
                "Director": "Brad Bird",
                "Writer": "Brad Bird",
                "Actors": "Craig T. Nelson, Holly Hunter, Samuel L. Jackson, Jason Lee",
                "Plot": "A family of undercover superheroes, while trying to live the quiet suburban life, are forced into action to save the world.",
                "Language": "English, French",
                "Country": "USA",
                "Awards": "Won 2 Oscars. Another 65 wins & 55 nominations.",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTY5OTU0OTc2NV5BMl5BanBnXkFtZTcwMzU4MDcyMQ@@._V1_SX300.jpg",
                "Ratings": [
                    {
                        "Source": "Internet Movie Database",
                        "Value": "8.0/10"
                    },
                    {
                        "Source": "Metacritic",
                        "Value": "90/100"
                    }
                ],
                "Metascore": "90",
                "imdbRating": "8.0",
                "imdbVotes": "610,789",
                "imdbID": "tt0317705",
                "Type": "movie",
                "DVD": "29 Mar 2005",
                "BoxOffice": "N/A",
                "Production": "N/A",
                "Website": "N/A",
                "Response": "True"
            }
        }

        console.log(this.state.movieInfo)
    }

    async componentDidMount(){

    }

    render () {
        console.log(this.state.movieInfo.Title)
        return (
            <div className={'info-container'}>
                <div className={'heading'}>
                    <text className={'title'}>
                        {this.state.movieInfo.Title}
                    </text>
                    <text className={'rated'}>
                        {this.state.movieInfo.Rated + " " + this.state.movieInfo.imdbRating + "/10.0"}
                    </text>
                </div>
            </div>
        );
    }
}

export default MovieInfo
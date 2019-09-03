import React, {Component} from 'react'

import './MoviePoster.css'

class MoviePoster extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        const poster = this.props.poster

        var divStyle = {
            backgroundImage: 'url(' + poster + ')'
        }

        return (
            <div className={'poster'} style={divStyle}>
            </div>
        )
    }
}

export default MoviePoster;
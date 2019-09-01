import React, {Component} from 'react'

class MovieInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieId : props.movieId,
            movieInfo: props.movieInfo
        }
    }

    async componentDidMount(){

    }

    render () {
        return (
            <div className={'info-container'}>
                <title>
                    {this.state.movieInfo.title}
                </title>
            </div>
        );
    }


}
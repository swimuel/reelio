import React from 'react'
import './PledgeDetails.css'
import { Spin } from 'antd'
import MoviePoster from '../movie/MoviePoster'
import CampaignDetails from '../campaign/CampaignDetails'
import { getCampaignById, getMoviesByID } from '../../api'

class PledgeDetails extends React.Component {
    state = {
        campaign: null,
        loading: true
    }

    async componentDidMount() {
        const id = this.props.id
        const imdbID = this.props.imdbID
        const campaign = await getCampaignById(id)
        const movie = await getMoviesByID(imdbID)
        this.setState({ campaign: campaign, movie: movie, loading: false })
    }

    render() {
        const { campaign } = this.state
        const { movie } = this.state

        return this.state.loading ? <Spin /> : (
            <div className={'det-container'}>
                <div className={'custom-col-1'}>
                    <CampaignDetails campaign={campaign} />
                </div>
                <div className={'custom-col-2'}>
                    <MoviePoster poster={movie.Poster} />
                </div>
            </div>
        )
    }
}

export default PledgeDetails
import React from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>

/** API key can only be used once per day for free  */
class CinemaMap extends React.Component {
    static defaultProps = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };

    render () {
      return (
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCwwpYuCGGpppayR5zTgbCHbU-bdH7BAoY' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text='My Marker'
            />
          </GoogleMapReact>
        </div>
      )
    }
}

export default CinemaMap

import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import './styles/Map.css'

const Report = ({ color }) => <div style={{backgroundColor: '#'+color}} className='report-icon' />
const LogoElement = ({ src }) => <img width='100px' height='100px' alt='Door2Door logo' src={src}/>

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentReports:[],
      isLoading: true,
    }

    this.renderReports = this.renderReports.bind(this)
    this.updateReports = this.updateReports.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.updateReports(nextProps.reports)
  }

  static defaultProps = {
    center: [-29.754994, -51.150283], // São leopoldo location
    zoom: 11
  }

  renderReports(report, index) {
    return <Report
      key={index}
      lat={report.lat}
      lng={report.lng}
      color='green'
    />
  }

  updateReports(reports=this.props.reports){
    this.setState({isLoading: true})

    const promise = Object.entries(reports).map(this.renderReports)
    let _this = this
    Promise.all(promise).then((results) => {
      _this.setState( {currentReports: results, isLoading: false} )
    })
  }

  getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2) {
    var R = 6371 // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1)  // deg2rad below
    var dLon = deg2rad(lng2-lng1)
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  render() {
    const API_KEY = 'AIzaSyCiar1kjMg0w3zDy4ZLGRll-wfjHIc_7qA'

    const { isLoading, currentReports } = this.state

    return (
      <div>
        {
          isLoading &&
          <div className='loading-wrap'/>
        }
          <GoogleMapReact
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            style={{height: '100%', 'width': '100%'}}
            // onChange={this.onMapChange}
            bootstrapURLKeys={{
              key: API_KEY
            }}
            >
              <LogoElement
                src="http://projeto.unisinos.br/termilex/images/logos/logo_unisinos01.gif"
                lat='-29.795943'
                lng='-51.153468'
              />
              {
                currentReports
              }
          </GoogleMapReact>
        }
      </div>
    );
  }
}

export default SimpleMap

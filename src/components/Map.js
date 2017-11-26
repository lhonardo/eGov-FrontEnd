import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Report from './Report.js';
import '../styles/Map.css'
import Modal from './Modal'
import CreateReportModal from './CreateReportModal'
import DistanceLimitModal from './DistanceLimitModal'
import { geolocated } from 'react-geolocated'

const LogoElement = ({ src }) => <img width='60px' height='60px' alt='Unisinos logo' src={src}/>
const CurrentPosition = ({ src }) => <img width='48px' height='48px' alt='CurrentPosition' src={src}/>
const RANGE = 6 // allowed range in KM from center point

class SimpleMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentReports:[],
      isLoading: true,
      modalKey: null,
      modal: false,
      creatingReport: false,
      createReportPosition: {},
      distanceLimitModal: false,
      distance: 0,
      gps: {
        lat: '',
        lng: ''
      }
    }

    this.renderReports = this.renderReports.bind(this)
    this.updateReports = this.updateReports.bind(this)
    this._onChildClick = this._onChildClick.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coords){
      this.setState({
        gps: {
          lat: nextProps.coords.latitude,
          lng: nextProps.coords.longitude
        }
      })
    }
    this.updateReports(nextProps.reports)
  }

  static defaultProps = {
    center: [-29.754994, -51.150283], // São leopoldo location
    zoom: 13
  }

  renderReports(report, index) {
    return <Report
      key={index}
      lat={report.lat}
      lng={report.lng}
      report={report}
    />
  }

  updateReports(reports=this.props.reports){
    this.setState({isLoading: true})

    const promise = reports.map(this.renderReports)
    let _this = this
    Promise.all(promise).then((results) => {
      _this.setState( {currentReports: results, isLoading: false} )
    })
  }

  getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2) {
    var R = 6371 // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1)  // deg2rad below
    var dLon = this.deg2rad(lng2-lng1)
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  _onChildClick(e) {
    this.setState({modal: true, modalKey: e})
  }

  closeModal(){
    this.setState({
      modal: false,
      creatingReport: false,
      modalReport: {},
      distanceLimitModal: false
    })
  }

  onMapClick(e){
    const { center } = this.props
    const distance = this.getDistanceFromLatLonInKm(center[0], center[1], e.lat, e.lng)
    if (distance <= RANGE){
      if(this.state.modal && !this.state.creatingReport){
        this.closeModal()
      }else if(!this.state.creatingReport){
        this.setState({creatingReport: true, createReportPosition: e})
      }
    }else{
      this.setState({distanceLimitModal: true, distance: distance})
    }

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

        {
          this.state.modal &&
          <Modal
            report={this.props.reports[this.state.modalKey]}
            closeModal={this.closeModal}
          />
        }
        {
          this.state.distanceLimitModal &&
          <DistanceLimitModal
            range={RANGE}
            distance={this.state.distance}
            closeModal={this.closeModal}
          />
        }
        {
          this.state.creatingReport &&
          <CreateReportModal
            closeModal={this.closeModal}
            createReportPosition={this.state.createReportPosition}
          />
        }
          <GoogleMapReact
            bootstrapURLKeys={{
              key: API_KEY
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            style={{height: '100%', 'width': '100%'}}
            onClick={this.onMapClick}
            onChildClick={this._onChildClick}
            >
              <LogoElement
                src="http://projeto.unisinos.br/termilex/images/logos/logo_unisinos01.gif"
                lat='-29.795943'
                lng='-51.153468'
              />
              {
                this.props.isGeolocationEnabled &&
                <CurrentPosition
                  src="https://www.shareicon.net/data/128x128/2016/05/20/768146_aim_512x512.png"
                  lat={this.state.gps.lat}
                  lng={this.state.gps.lng}
                />
              }

              {
                currentReports
              }
          </GoogleMapReact>
        }
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(SimpleMap)

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyLocation from 'material-ui/svg-icons/maps/my-location';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { getRestaurants } from './../../services/restaurant';
import { updateClientAddress, updateClientCoordinates } from './../../modules/ClientLocation/actions';
import { connect } from 'react-redux';
import './ClientLocation.css';


class ClientLocation extends Component {
  constructor(props) {
    super(props)
    this.getLocation = this.getLocation.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  componentDidMount() {
    let inputNode = document.getElementsByClassName('text-field')[0];
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);
    autoComplete.addListener('place_changed', () => {
      this.props.updateClientAddress(autoComplete.getPlace().formatted_address)
      this.props.updateClientCoordinates({latitude: autoComplete.getPlace().geometry.location.lat(), longitude: autoComplete.getPlace().geometry.location.lng()})
      this.props.getRestaurants(autoComplete.getPlace().geometry.location.lat(), autoComplete.getPlace().geometry.location.lng());
      window.map.setCenter({lat: autoComplete.getPlace().geometry.location.lat(), lng: autoComplete.getPlace().geometry.location.lng()})
      window.markers.clientMarker.setPosition({lat: autoComplete.getPlace().geometry.location.lat(), lng: autoComplete.getPlace().geometry.location.lng()})
    })
  }

  getLocation() {
    if(!navigator.geolocation) {
      alert('browser does not support geolocation');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      let latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
      this.props.updateClientCoordinates({latitude: position.coords.latitude, longitude: position.coords.longitude})
      let geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({'location': latlng}, (results, status) => {
        if(status === 'OK') {
          this.props.updateClientAddress(results[0].formatted_address);
        }
      });
      window.markers.clientMarker.setPosition(latlng);
      window.map.setCenter(latlng)
      this.props.getRestaurants(position.coords.latitude, position.coords.longitude);
    });
    
  }

  onTextChange(evt) {
    this.props.updateClientAddress(evt.target.value);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <input
            className="text-field"
            value={this.props.clientLocation.address}
            onChange={this.onTextChange}
          />
          <FloatingActionButton
            secondary={true}
            className="location-detect"
            onClick={this.getLocation}
          >
            <MyLocation />
          </FloatingActionButton>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    clientLocation: state.clientLocation
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRestaurants: (latitude, longitude) => {
      dispatch(getRestaurants(latitude, longitude));
    },
    updateClientAddress: payload => {
      dispatch(updateClientAddress(payload));
    },
    updateClientCoordinates: payload => {
      dispatch(updateClientCoordinates(payload))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientLocation);
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ClientLocation from './../ClientLocation';
import RestaurantListWrapper from './../RestaurantListWrapper';
import { connect } from 'react-redux';
import { getRestaurants } from './../../services/restaurant';
import { updateClientAddress, updateClientCoordinates } from './../../modules/ClientLocation/actions';
import './Home.css';


class Home extends Component {

  componentDidMount() {
    if(!navigator.geolocation) {
      alert('browser does not support geolocation');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      window.map = new window.google.maps.Map(document.getElementsByClassName('map')[0], {
        zoom: 15,
        center: { lat: position.coords.latitude, lng: position.coords.longitude }
      });
      window.markers = {}
      window.markers.clientMarker = new window.google.maps.Marker({
        position: { lat: position.coords.latitude, lng: position.coords.longitude },
        map: window.map,
        animation: window.google.maps.Animation.DROP,
      });
      let latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
      this.props.updateClientCoordinates({latitude: position.coords.latitude, longitude: position.coords.longitude})
      let geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({'location': latlng}, (results, status) => {
        if(status === 'OK') {
          console.log(results)
          this.props.updateClientAddress(results[0].formatted_address);
        }
      });

      this.props.getRestaurants(position.coords.latitude, position.coords.longitude);
    });    
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="map-canvas">
          <div className="map"></div>
          <ClientLocation />
          <RestaurantListWrapper />
        </div>
      </MuiThemeProvider>
    );
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
      dispatch(updateClientCoordinates)
    }
  }
}

export default connect(null, mapDispatchToProps)(Home);
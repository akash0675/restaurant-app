import React, { Component } from 'react';
import RestaurantListItem from './../../components/RestaurantListItem'
import { connect } from 'react-redux';
import classnames from 'classnames';
import './RestaurantListWrapper.css';

class RestaurantListWrapper extends Component {
  constructor(props) {
    super(props)
    this.state={
      isListVisible: true
    };
    this.onClickListItem = this.onClickListItem.bind(this);
    this.onChangeListVisibility = this.onChangeListVisibility.bind(this);
  }

  onClickListItem(latitude, longitude) {
    if (window.markers.destinationMarker === undefined) {
      window.markers.destinationMarker = new window.google.maps.Marker({
        position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        map: window.map,
        animation: window.google.maps.Animation.DROP,
      });
    }
    window.markers.destinationMarker.setPosition({ lat: parseFloat(latitude), lng: parseFloat(longitude) })
    this.onChangeListVisibility();
  }

  onChangeListVisibility() {
    if(this.state.isListVisible){
      this.setState({ isListVisible: false });
    }
    else {
      this.setState({ isListVisible: true });
    }
  }

  render() {
    return (
      <div className="restaurant-list-wrapper">
        <div className="restaurant-list-visibility-toggle" onClick={this.onChangeListVisibility}>
          {this.state.isListVisible ? 'hide list' : 'show list'}
        </div>
        <div className={classnames("restaurant-list-container", { hide: !this.state.isListVisible })}>
        {
          this.props.restaurantList !== undefined ?
          (
            this.props.restaurantList.map((restaurant, index) => (
              <RestaurantListItem
                key={index}
                restaurant={restaurant.restaurant}
                onClickListItem={this.onClickListItem}
              />
            ))
          ) :
          undefined
        }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    restaurantList: state.restaurantList.restaurantList,
    clientCoordinates: state.clientLocation.coordinates
  }
};

export default connect(mapStateToProps)(RestaurantListWrapper);
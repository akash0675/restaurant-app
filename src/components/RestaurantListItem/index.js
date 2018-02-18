import React from 'react';
import './RestaurantListItem.css';

const RestaurantListItem = ({ restaurant, onClickListItem }) => {
  return (
    <div className="restaurant-list-item">
      <div className="restaurant-list-item__wrapper" onClick={() => onClickListItem(restaurant.location.latitude, restaurant.location.longitude)}>
        <div className="restaurant-list-item__wrapper--text">
          <div className="restaurant-name">
            <span>
              {restaurant.name}
            </span>
          </div>
          <div className="restaurant-description">
            <div className="restaurant-rating">
              {restaurant.user_rating.aggregate_rating}
            </div>
            { restaurant.has_online_delivery ? (<div>Online delivery available</div>) : undefined }  
          </div>
          <div className="restaurant-cusine">
            {restaurant.cuisines}
          </div>
          <div className="restaurant-link">
            <a href={restaurant.url}>See Menu</a>
          </div>
        </div>
        <div className="restaurant-list-item__wrapper--image">
          <img src={restaurant.featured_image} alt="featured"/>
        </div>
      </div>
    </div>
  );
}

export default RestaurantListItem;
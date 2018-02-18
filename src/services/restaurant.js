import request from 'superagent';
import { ZOMATO_API_ENDPOINT, ZOMATO_API_KEY } from './../config';
import { populateRestaurants } from './../modules/RestaurantList/actions';

export const getRestaurants = (latitude, longitude) => {
  return dispatch => {
    request
      .get(`${ZOMATO_API_ENDPOINT}geocode`)
      .set('user-key', ZOMATO_API_KEY)
      .query({ lat: latitude })
      .query({ lon: longitude })
      .then(res => {
        dispatch(populateRestaurants(res.body.nearby_restaurants));
      })
      .catch(err => {
        console.log(err);
      })
  }
}
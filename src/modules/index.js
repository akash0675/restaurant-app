import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import clientLocationReducer from './ClientLocation/reducer';
import restaurantListReducer from './RestaurantList/reducer';

export default combineReducers({
  routing: routerReducer,
  clientLocation: clientLocationReducer,
  restaurantList: restaurantListReducer
});

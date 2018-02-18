const initialState = {
  restaurantList: []
}

const restaurantListReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'POPULATE_RESTAURANTS':
      return { ...state, restaurantList: action.payload };
    default:
      return state;
  }
}

export default restaurantListReducer;

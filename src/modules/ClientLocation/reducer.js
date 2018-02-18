const initialState = {
  address: "",
  coordinates: {
    latitude: '',
    longitude: ''
  }
}

const clientLocationReducer = (state=initialState, action) => {
  switch(action.type){
    case 'UPDATE_CLIENT_ADDRESS':
      return { ...state, address: action.payload };
    case 'UPDATE_CLIENT_COORDINATES':
      let _coordinates = {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude
      }
      return { ...state, coordinates: _coordinates };
    default:
      return state;
  }
}

export default clientLocationReducer;

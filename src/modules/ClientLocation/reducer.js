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
      return state;
    case 'UPDATE_CLIENT_COORDINATES':
      return state;
    default:
      return state;
  }
}

export default clientLocationReducer;

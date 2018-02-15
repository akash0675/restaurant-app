const updateClientAddress = payload => {
  return {
    type: 'UPDATE_CLIENT_ADDRESS',
    payload: payload
  };
}

const updateClientCoordinates = payload => {
  return {
    type: 'UPDATE_CLIENT_COORDINATES',
    payload: payload
  };
}

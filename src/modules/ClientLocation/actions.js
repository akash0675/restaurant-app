export const updateClientAddress = payload => {
  return {
    type: 'UPDATE_CLIENT_ADDRESS',
    payload: payload
  };
}

export const updateClientCoordinates = payload => {
  return {
    type: 'UPDATE_CLIENT_COORDINATES',
    payload: payload
  };
}

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'NULL_NOTIFICATION':
    return null
  default:
    return state
  }
}

export const setNotification = (message, seconds, type = null) => {
  const ms  = seconds * 1000
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, type }
    })
    setTimeout(() => {
      dispatch({
        type: 'NULL_NOTIFICATION'
      })
    }, ms)
  }
}

export default reducer
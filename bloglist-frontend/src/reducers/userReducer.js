import blogService from '../services/blogs'
import loginService from '../services/login'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const checkUser = () => {
  return async dispatch => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    } catch (exception) {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: {
          message: 'Wrong username or password',
          type: 'error'
        }
      })
      setTimeout(() => {
        dispatch({
          type: 'NULL_NOTIFICATION'
        })
      }, 3000)
    }
  }
}

export const logout = () => {
  window.localStorage.clear()
  blogService.setToken(null)
  return {
    type: 'SET_USER',
    data: null
  }
}

export default reducer
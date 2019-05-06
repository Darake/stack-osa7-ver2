import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useField } from './hooks'
import Notification from './components/Notification'
import BlogView from './components/BlogView'
import Users from './components/Users'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { checkUser, login, logout } from './reducers/userReducer'

const App = props => {
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
  }, [])

  useEffect(() => {
    props.checkUser()
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    props.login(username.value, password.value)
    resetUsername()
    resetPassword()
  }

  const userById = id => props.users.find(user => user.id === id)

  if (props.user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            Käyttäjätunnus:
            <input {...username} />
          </div>
          <div>
            Salasana:
            <input {...password} />
          </div>
          <button type="submit">Kirjaudu</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{props.user.name} logged in</p>
      <button onClick={() => props.logout()}>Log out</button>
      <Router>
        <div>
          <Route exact path="/" render={() => <BlogView />} />
          <Route exact path="/users" render={() => <Users />} />
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={userById(match.params.id)} />
          } />
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers,
  checkUser,
  login,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
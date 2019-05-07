import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useField } from './hooks'
import Navigation from './components/Navigation'
import Notification from './components/Notification'
import BlogView from './components/BlogView'
import Blog from './components/Blog'
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
  const blogById = id => props.blogs.find(blog => blog.id === id)

  if (props.user === null) {
    return (
      <div className="container">
        <h2>Log in to application</h2>
        <Notification />
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <div>
              <Form.Label>Käyttäjätunnus:</Form.Label>
              <Form.Control {...username} />
            </div>
            <div>
              <Form.Label>Salasana:</Form.Label>
              <Form.Control {...password} />
            </div>
            <Button type="submit">Kirjaudu</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  return (
    <Router>
      <Navigation />
      <div className="container">
        <Notification />
        <h2>Blog app</h2>
        <div>
          <Route exact path="/" render={() => <BlogView />} />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <Blog blog={blogById(match.params.id)} />
          } />
          <Route exact path="/users" render={() => <Users />} />
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={userById(match.params.id)} />
          } />
        </div>
      </div>
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
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
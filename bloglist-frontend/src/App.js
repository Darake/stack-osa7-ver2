import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useField } from './hooks'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = props => {
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    } catch (exception) {
      props.setNotification('Wrong username or password', 3, 'error')
    }

    resetUsername()
    resetPassword()
  }

  const handleLogout = () => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const newBlogRef = React.createRef()

  if (user === null) {
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
      <p>{user.name} logged in</p>
      <button onClick={() => handleLogout()}>Log out</button>
      <Togglable buttonLabel="New blog" ref={newBlogRef}>
        <NewBlog blogRef={newBlogRef}/>
      </Togglable>
      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
        />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
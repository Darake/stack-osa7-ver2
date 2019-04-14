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

const App = props => {
  const [blogs, setBlogs] = useState([])
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
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

  const likeBlog = async (id, blogObject) => {
    const updatedBlog = await blogService.update(id, blogObject)
    setBlogs(blogs
      .map(blog => blog.id === id ? updatedBlog : blog)
      .sort((a, b) => b.likes - a.likes))
  }

  const removeBlog = async blog => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

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
        <NewBlog blogs={blogs} setBlogs={setBlogs} blogRef={newBlogRef}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
          user={user}
        />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, { setNotification })(App)
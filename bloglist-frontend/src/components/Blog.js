import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, ...props }) => {
  if (blog === undefined) return null

  const showIfCreator = { display: blog.user.username === props.user.username ? '' : 'none' }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>

      <a href={blog.url}>{blog.url}</a> <br/>
      {blog.likes} likes
      <button onClick={() => props.likeBlog(blog)}>like</button> <br/>
      added by {blog.user.name} <br/>
      <button style={showIfCreator} onClick={() => props.removeBlog(blog)}>Remove</button>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDistpatchToProps = {
  likeBlog,
  removeBlog
}

export default connect(mapStateToProps, mapDistpatchToProps)(Blog)
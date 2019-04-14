import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user, ...props }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [expanded, setExpanded] = useState(false)

  const showWhenExpanded = { display: expanded ? '' : 'none' }
  const showIfCreator = { display: blog.user.username === user.username ? '' : 'none' }

  return (
    <div style={blogStyle} className="blog">
      <div onClick={() => setExpanded(!expanded)} className="basicInformation">
        {blog.title} by {blog.author}
      </div>
      <div style={showWhenExpanded} className="togglableContent">
        {blog.url} <br/>
        {blog.likes} likes
        <button onClick={() => props.likeBlog(blog)}>like</button> <br/>
        added by {blog.user.name} <br/>
        <button style={showIfCreator} onClick={() => props.removeBlog(blog)}>Remove</button>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

const mapDistpatchToProps = {
  likeBlog,
  removeBlog
}

export default connect(null, mapDistpatchToProps)(Blog)
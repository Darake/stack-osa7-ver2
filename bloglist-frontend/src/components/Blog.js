import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { useField } from '../hooks'

const Blog = ({ blog, ...props }) => {
  if (blog === undefined) return null

  const [comment, commentReset] = useField('text')

  const showIfCreator = { display: blog.user.username === props.user.username ? '' : 'none' }

  const handleNewComment = () => {
    props.addComment(blog.id, comment.value)
    commentReset()
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>

      <a href={blog.url}>{blog.url}</a> <br/>
      {blog.likes} likes
      <button onClick={() => props.likeBlog(blog)}>like</button> <br/>
      added by {blog.user.name} <br/>
      <button style={showIfCreator} onClick={() => props.removeBlog(blog)}>Remove</button>

      <h3>Comments</h3>

      <form onSubmit={handleNewComment}>
        <input {...comment} />
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment}>{comment}</li>
        )}
      </ul>
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
  removeBlog,
  addComment
}

export default connect(mapStateToProps, mapDistpatchToProps)(Blog)
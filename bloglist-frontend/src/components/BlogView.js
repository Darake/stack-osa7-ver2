import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import Blog from './Blog'

const BlogView = props => {
  const newBlogRef = React.createRef()

  return (
    <div>
      <Togglable buttonLabel="New blog" ref={newBlogRef}>
        <NewBlog blogRef={newBlogRef}/>
      </Togglable>
      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(BlogView)
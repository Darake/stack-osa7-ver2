import React from 'react'

const User = props => {
  return (
    <div>
      <h2>{props.user.name}</h2>

      <h3>added blogs</h3>
      <ul>
        {props.user.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default User
import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
      .sort((a, b) => b.likes - a.likes)
  case 'UPDATE_BLOG':
    return state
      .map(blog => blog.id === action.data.id ? action.data : blog)
      .sort((a, b) => b.likes - a.likes)
  case 'REMOVE_BLOG':
    return state
      .filter(b => b.id !== action.data)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: sortedBlogs
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const createdBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: createdBlog
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(blog.id, likedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blog.id
      })
    }
  }
}

export default reducer
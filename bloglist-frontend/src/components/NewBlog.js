import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const NewBlog = ({ blogRef, ...props }) => {
  const [title, resetTitle] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [url, resetUrl] = useField('text')

  const handleCreate = async (event) => {
    event.preventDefault()
    blogRef.current.toggleVisibility()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    props.createBlog(blogObject)
    props.setNotification(`A new blog ${title.value} by ${author.value} added`, 3)

    resetTitle()
    resetAuthor()
    resetUrl()

  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Control placeholder="Title" {...title} />
          <Form.Control placeholder="Author" {...author} />
          <Form.Control placeholder="URL" {...url} />
          <Button size="sm" type="submit">Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

const mapDistpatchToProps = {
  setNotification,
  createBlog
}

export default connect(mapStateToProps, mapDistpatchToProps)(NewBlog)
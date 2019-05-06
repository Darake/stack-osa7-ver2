import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Navigator = props => {
  const padding = { padding: 5 }
  const barStyle = {
    background: 'lightgrey',
    borderRadius: 5,
    padding: 8
  }

  return (
    <div style={barStyle}>
      <Link style={padding} to="/">Blogs</Link>
      <Link style={padding} to="/users">Users</Link>
      {props.user.name} logged in   <button onClick={() => props.logout()}>Log out</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { logout })(Navigator)
import React from 'react'
import { connect } from 'react-redux'

const Users = props => (
  <div>
    <h2>Users</h2>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </tbody>
      {props.users.map(user =>
        <tbody key={user.id}>
          <tr>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        </tbody>
      )}
    </table>
  </div>
)

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)
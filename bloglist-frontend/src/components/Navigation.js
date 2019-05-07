import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Navbar, Nav } from 'react-bootstrap'
import { logout } from '../reducers/userReducer'

const Navigator = props => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <NavLink to="/" activeClassName="active">Blogs</NavLink>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <NavLink to="/users">Users</NavLink>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <span >{props.user.name} logged in</span>
            <Button size="sm" variant="secondary" onClick={() => props.logout()}>Log out</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { logout })(Navigator)
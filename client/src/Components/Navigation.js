import React from 'react'
import {Navbar, Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

const Navigation = (props) => {
	return (
		<React.Fragment>
			<Navbar expand="md" className='pb-4'>
        
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
          <h1><a href='/'>Arelys Stationary Box</a></h1>
            <Navbar.Collapse id="basic-navbar-nav">
            
              <Nav className="ml-auto">
			
			{props.currentUser
				? (
					<>
					
						<Nav.Item>
						<NavLink to="/products">Products</NavLink>
						</Nav.Item>
						<Nav.Item>
						<NavLink to="/users">Users</NavLink>
						</Nav.Item>
						<Nav.Item>
						<NavLink to="/logout">Log Out</NavLink>
						</Nav.Item>
					
					</>
				)
				: (
					<>
						<Nav.Item>
						<NavLink to="/products">Products</NavLink>
						</Nav.Item>
						<Nav.Item>
						<NavLink to="/login">Log In</NavLink>
						</Nav.Item>
						<Nav.Item>
						<NavLink to="/signup">Sign Up</NavLink>
						</Nav.Item>
					
					</>
				)
			}
				</Nav>
				</Navbar.Collapse>
			</Navbar>
		</React.Fragment>
	)
}

export default Navigation
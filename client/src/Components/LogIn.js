import React from 'react'
import {Form, Container, Button } from 'react-bootstrap'
import httpClient from '../httpClient'

class LogIn extends React.Component {
	state = {
		fields: {email: '', password: ''}
	}

	onInputChange(e) {
		this.setState({
			fields: {
				...this.state.fields,
				[e.target.name]: e.target.value
			}
		})
	}

	onFormSubmit(e) {
		e.preventDefault()
		httpClient.logIn(this.state.fields).then(user => {
			this.setState({ fields: { email: '', password: '' } })
			if(user) {
				this.props.onLoginSuccess(user)
				this.props.history.push('/')
			}
		})
	}

	render() {
		const { email, password } = this.state.fields
		return (
		
			<div className='LogIn'>
				<h2 className="text-center">Log In</h2>
				<Container>

				<Form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
					<Form.Control type="text" placeholder="Email" name="email" value={email} />
					<Form.Control type="password" placeholder="Password" name="password" value={password} />
					<Button variant="dark" type="submit">Log In</Button >
				</Form>
				</Container>
			</div>
		
		)
	}
}

export default LogIn
import React from 'react'
import {Form, Container, Button} from 'react-bootstrap'
import httpClient from '../httpClient'

// sign up Form behaves almost identically to log in Form. We could create a flexible Form component to use for both actions, but for now we'll separate the two:
class SignUp extends React.Component {
	state = {
		fields: { name: '', email: '', password: ''}
	}

	onInputChange(evt) {
		this.setState({
			fields: {
				...this.state.fields,
				[evt.target.name]: evt.target.value
			}
		})
	}

	onFormSubmit(evt) {
		evt.preventDefault()
		httpClient.signUp(this.state.fields).then(user => {
			this.setState({ fields: { name: '', email: '', password: '' } })
			if(user) {
				this.props.onSignUpSuccess(user)
				this.props.history.push('/')
			}
		})
	}
	
	render() {
		const { name, email, password } = this.state.fields
		return (
			<div className='SignUp'>
				{/* <div className='row'>
					<div className='column column-33 column-offset-33'> */}
						<h2>Sign Up</h2>
						<Container>
						<Form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
							<Form.Control type="text" placeholder="Name" name="name" value={name} />
							<Form.Control type="text" placeholder="Email" name="email" value={email} />
							<Form.Control type="password" placeholder="Password" name="password" value={password} />
							<Button variant="dark" type="submit">Sign Up</Button>
						</Form>
						</Container>
					{/* </div>
				</div> */}
			</div>
		)
	}
}

export default SignUp
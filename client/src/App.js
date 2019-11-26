import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import httpClient from './httpClient'


import ProductPage from './Components/ProductPage';
import Navigation from './Components/Navigation';
import LogIn from './Components/LogIn';
import LogOut from './Components/LogOut';
import SignUp from './Components/SignUp';
import Home from './Components/Home/';
import Contacts from './Components/Contacts';

class App extends React.Component {
	state = { currentUser: httpClient.getCurrentUser() }

	onLoginSuccess(user) {
		this.setState({ currentUser: httpClient.getCurrentUser() })
	}

	logOut() {
		httpClient.logOut()
		this.setState({ currentUser: null })
	}
	
	render() {
		const { currentUser } = this.state
		return (
			<React.Fragment >
				<Router>
  
				<Navigation currentUser={currentUser} />
				<Switch>

					<Route path="/login" render={(props) => {
						return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
					}} />

					<Route path="/logout" render={(props) => {
						return <LogOut onLogOut={this.logOut.bind(this)} />
					}} />

					{/* the sign up component takes an 'onSignUpSuccess' prop which will perform the same thing as onLoginSuccess: set the state to contain the currentUser */}
					<Route path="/signup" render={(props) => {
						return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
					}} />

					<Route path="/products" render={() => {
						return <ProductPage/>
					}} />

					<Route path='/users' render={() => {
						return currentUser
						?<Contacts/>
						:<Redirect to="/login"/>
					}}
					/>

					<Route path="/" component={Home} />

				</Switch>
				</Router>
			</React.Fragment>
		)
	}
}

export default App
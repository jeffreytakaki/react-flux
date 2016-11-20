import React from 'react'
import SessionButton from './SessionButton.jsx'

export default class SignIn extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			uid: '',
			displayName: '',
			email: '',
			isLoggedIn: false

		}


		// this.toggleSignIn = this.toggleSignIn.bind(this)
		// this.saveUser = this.saveUser.bind(this)
		// this.handleLoginClick = this.handleLoginClick.bind(this)
		// this.handleLogoutClick = this.handleLogoutClick.bind(this)

	}

  //   toggleSignIn() {
  //   	var self = this

  //   	let firebase = this.props.firebase
  //   	let database = this.props.database


		// if (!firebase.auth().currentUser) {
		// 	var provider = new firebase.auth.FacebookAuthProvider();
		// 	provider.addScope('user_birthday');
		// 	firebase.auth().signInWithPopup(provider).then(function(result) {
		// 		var token = result.credential.accessToken;
		// 		var user = result.user;
		// 		self.saveUser(user)
		// 		self.handleLoginClick()
				
		// 	}).catch(function(error) {
				
		// 		var errorCode = error.code;
		// 		var errorMessage = error.message;
				
		// 		var email = error.email;
		// 		// The firebase.auth.AuthCredential type that was used.
		// 		var credential = error.credential;
		// 		// [START_EXCLUDE]
		// 		if (errorCode === 'auth/account-exists-with-different-credential') {
		// 			alert('You have already signed up with a different auth provider for that email.');
		// 			// If you are using multiple auth providers on your app you should handle linking
		// 			// the user's accounts here.
		// 		} else {
		// 			console.error(error);
		// 		}
		// 		// [END_EXCLUDE]
		// 	});
		// } else {
		// 	firebase.auth().signOut();
		// }
		
  //   }
  //   // [END buttoncallback]

  //   toggleSignOut() {
  //   	firebase.auth().signOut();
  //   }

  //   saveUser(user) {
    	
		// this.setState({
		// 	uid: user.uid,
		// 	photoURL: user.photoURL,
		// 	displayName: user.displayName,
		// 	email: user.email
		// })

		// console.log(this.state)

		// // need logic to only create new user if user hasn't already been created already. 
		// // use uid

		// // database.ref('users').push({
		// // 	profilePhoto: user.photoURL,
		// // 	displayName: user.displayName,
		// // 	email: user.email
		// // });


  //   }
	// function LoginButton(props) {
	// return (
	// <button onClick={props.onClick}>
	// Login
	// </button>
	// );
	// }

	// function LogoutButton(props) {
	// return (
	// <button onClick={props.onClick}>
	// Logout
	// </button>
	// );
	// }

	// handleLoginClick() {
	// 	this.setState({isLoggedIn: true});
	// }

	// handleLogoutClick() {
	// 	this.setState({isLoggedIn: false});
	// }


	render() {
		const isLoggedIn = this.state.isLoggedIn;

		let button = null;
		
		// if (isLoggedIn) {
		// 	button = <SessionButton onClick={this.handleLogoutClick} />
		// } else {
		// 	button = <SessionButton onClick={this.handleLogoutClick} />
		// }
		
		return (
			<div>
				<img src={this.props.user.photoURL} alt={this.props.user.displayName}/>
				<button className="btn btn-primary" onClick={this.props.toggleSignIn}>Sign in</button>
			</div>
		)
		
	}



}
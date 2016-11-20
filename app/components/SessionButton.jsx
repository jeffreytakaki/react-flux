import React from 'react'


export default class SessionButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			uid: '',
			displayName: '',
			email: '',
			loggedIn: 'Sign In',
			savedRecipes:[]
		}

		this.saveRecipe = this.saveRecipe.bind(this)

	}

	

	
	render() {
			
		

		return (
		<div>
		<Greeting isLoggedIn={isLoggedIn} />
		{button}
		</div>
		);
	}
}
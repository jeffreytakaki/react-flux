import React from 'react'
import SignIn from '../components/SignIn.jsx'

export default class Nav extends React.Component {

	constructor(props) {
		super(props)
		this.state ={
			database: {},
			firebase:{}
		}		
	}

	render() {
		var setbreaks
		return (
			<header>
				<div className="container">
					<div className="row">
						<div className="col-md-3">Food List</div>
						<div className="col-md-3"></div>
						<div className="col-md-3"></div>
						<div className="col-md-3">
							<SignIn firebase={this.props.firebase} database={this.props.database} user={this.props.user} toggleSignIn={this.props.toggleSignIn}/>
						</div>
					</div>
				
				</div>
			</header>
		)
	}



}

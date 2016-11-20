import React from 'react'
import {makeKey} from '../utils/makeKey.jsx'

export default class RecipeItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				uid: '',
				displayName: '',
				email: '',
				loggedIn: 'Sign In',
				savedRecipes:[]
			}
		}

		this.saveRecipe = this.saveRecipe.bind(this)

	}

	saveRecipe(event) {

		//go to the upmost parent to get attribute values
		let target = event.target.parentNode.parentNode.parentNode.parentNode
		console.log(target)

		//build save object
		let saveObject = {
			image: target.dataset.image,
			title: target.dataset.title,
			url: target.dataset.url,
			recipe_id: makeKey(target.dataset.recipe_id),
			completed: false
		}

		// add saveObject to array
		let saveRecipeArray = []
		saveRecipeArray.push(saveObject)

		// push saveRecipeArray to state
		// this.setState({
		// 	user: {
		// 		saveRecipe:saveRecipeArray
		// 	}
		// })
		
		this.props.saveRecipe(saveObject)
	}

	
	render() {
		
		return (
			<div className="row" data-recipe_id={this.props.recipe_id} data-title={this.props.title} data-url={this.props.url} data-image={this.props.image}>
				<div className="col-md-3">
					<a href={this.props.url}> <img src={this.props.image} alt={this.props.title} /> </a>
				</div>
				<div className="col-md-6">
					<h3>{this.props.title}</h3>
				</div>
				<div className="col-md-3">
					<div className="row">
						<div className="col-md-12">
							<button onClick={this.saveRecipe} className="btn btn-info">Save Recipe</button>
						</div>
					</div>		
				</div>
			</div>	
		)
	}
}






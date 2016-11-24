import React from 'react'

export default class RecipeItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}

		this.buildRecipe = this.buildRecipe.bind(this)

	}

	buildRecipe(event) {

		// //go to the upmost parent to get attribute values
		let target = event.target.parentNode.parentNode.parentNode.parentNode
		let key = target.dataset.recipe_id

		// //build save object
		let saveObject = {
			image: target.dataset.image,
			title: target.dataset.title,
			url: target.dataset.url,
			recipe_id: key,
			completed: false
		}

		// // add saveObject to array
		let buildRecipeArray = []
		buildRecipeArray.push(saveObject)

		console.log(buildRecipeArray)
		
		this.props.saveRecipe(saveObject)
	}

	
	render() {
		
		return (
			<div className="row recipe-item" data-recipe_id={this.props.recipe_id} data-title={this.props.title} data-url={this.props.url} data-image={this.props.image}>
				<div className="col-md-3 recipe-col">
					<a href={this.props.url}> <img src={this.props.image} alt={this.props.title} /> </a>
				</div>
				<div className="col-md-6 recipe-col">
					<h3>{this.props.title}</h3>
				</div>
				<div className="col-md-3 recipe-col">
					<div className="row">
						<div className="col-md-12">
							<button onClick={this.buildRecipe} className="btn btn-info">Save Recipe</button>
						</div>
					</div>		
				</div>
			</div>	
		)
	}
}






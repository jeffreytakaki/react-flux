import React from 'react'


export default class RecipeItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: 'Save Recipe',
		}

		this.buildRecipe = this.buildRecipe.bind(this)
		this.displayButton = this.displayButton.bind(this)

	}

	componentWillMount() {

	}

	buildRecipe(event) {
		// //go to the upmost parent to get attribute values
		let target = event.target.parentNode.parentNode.parentNode.parentNode
	
		// //build save object
		let saveObject = {
			image: target.dataset.image,
			title: target.dataset.title,
			url: target.dataset.url,
			recipe_id: Date.now(),
			calories: target.dataset.calories,
			yield: target.dataset.yield,
			completed: false
		}

		// // add saveObject to array
		let buildRecipeArray = []
		buildRecipeArray.push(saveObject)

		this.setState({
            selected: 'Saved!'
        })
		
		this.props.saveRecipe(saveObject)
	}

	displayButton() {
		if(this.state.selected == "Save Recipe") {
			return <button onClick={this.buildRecipe} className='btn btn-info'>Save Recipe</button>
		} else {
			return <button onClick={this.buildRecipe} className='btn btn-warning'>Saved!</button>	
		}
	}
	
	render() {
		
		return (
			<div className="row recipe-item" data-recipe_id={this.props.recipe_id} data-title={this.props.title} data-url={this.props.url} data-image={this.props.image} data-calories={this.props.calories} data-yield={this.props.yield}>
				<div className="col-md-3 recipe-col">
					<a href={this.props.url} target="_blank"> <img src={this.props.image} alt={this.props.title} /> </a>
				</div>
				<div className="col-md-6 recipe-col">
					<div className="row">
						<div className="col-md-12">
							<h3 className ="recipe-name">{this.props.title}</h3>
						</div>
						<div className="col-md-12">
							<p><span className="calories-bold">{ parseInt(this.props.calories) }</span> Calories</p>
						</div>
						<div className="col-md-12">
							<p><span className="calories-bold">{ parseInt(this.props.yield) }</span> Servings</p>	
						</div>
					</div>
				</div>
				<div className="col-md-3 recipe-col">
					<div className="row">
						<div className="col-md-12">
						{this.displayButton()}
						</div>
					</div>		
				</div>
			</div>	
		)
	}
}






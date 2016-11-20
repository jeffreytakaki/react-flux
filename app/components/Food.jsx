import React from 'react'
import Request from 'superagent'
import JsonP from 'superagent-jsonp'


export default class Food extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			ingredients: ''
		}
		this.getRecipe = this.getRecipe.bind(this)
		this.saveIngredients = this.saveIngredients.bind(this)
		this.renderItems = this.renderItems.bind(this)
	}

	getRecipe(event) {
		//https://developer.edamam.com/edamam-docs-recipe-api
		var self = this;
		var url = 'https://api.edamam.com/search?app_id=0c525d9c&app_key=8bf67152e4c749ae710b8cd35eb85862&count=20&q='
		url +=  this.state.ingredients 
		var recipes = [];
		Request
		.get(url)
		.use(JsonP)
		.end(function(err, res) {
			console.log(err)
			console.log(res)
			var recipes = []

			if(!err) {

				res.body.hits.forEach(function(hit){
					recipes.push(hit)
				})

				self.renderItems(recipes)
			}
		})
	}

	saveIngredients(event) {
		this.setState({
			ingredients: event.target.value
		})
	}

	renderItems(recipes) {
		this.props.renderRecipeItem(recipes)
	}

	render() {
		
		return (
			<div className="container">
				<div className="row align-center">
					<div className="col-md-12">
						<input className="recipe-lookup" placeholder="Look up ingredients" onChange={this.saveIngredients} value={this.state.ingredients}/>
						<p className="caption-limit-ingredients">Search up to 3 ingredients, separated by commas</p>
					</div>
				</div>
				<div className="row align-center">
					<div className="col-md-12">
						<button className="btn btn-primary" onClick={this.getRecipe}>Search Recipes</button>
					</div>
				</div>
			</div>
		)
		
	}



}
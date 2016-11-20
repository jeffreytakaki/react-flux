import React from 'react'
import SavedItems from './SavedItems.jsx'


export default class SavedRecipes extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				savedRecipes: []
			}
		}
	}


	render() {
		let setbreak
		let savedRecipes = this.props.user.savedRecipes.map((recipe, index) => {
			var setbreak;
			return (
					<SavedItems 
					key = {index}
					image = {recipe.recipe.image}
					title = {recipe.recipe.label}
					recipe_id = {recipe.recipe.label} 
					url = {recipe.recipe.url}
					saveRecipe={this.saveRecipe}/>
			)
		})
		
		return (
			<div>
			<h1>Saved Recipes Here!</h1>
			{savedRecipes}
			</div>
		)
	}
}






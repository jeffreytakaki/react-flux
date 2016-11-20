import React from 'react'
import Nav from './Nav.jsx'
import Food from '../components/Food.jsx'
import RecipeItem from '../components/RecipeItem.jsx'
import SavedRecipes from '../components/SavedRecipes.jsx'
import SavedItems from '../components/SavedItems.jsx'


export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			recipes: [],
			user: { 
                uid: '',
                photoURL: '',
                displayName: '',
                email: '',
                savedRecipes: this.props.user.savedRecipes || []
            }
		}

		this.renderRecipeItem = this.renderRecipeItem.bind(this)
		this.saveRecipe = this.saveRecipe.bind(this)
		this.saveRecipe = this.saveRecipe.bind(this)
		this.deleteRecipe = this.deleteRecipe.bind(this)
		this.completedRecipe = this.completedRecipe.bind(this)

	}

	renderRecipeItem(recipes) {
		// clear recipes
		this.state = {
			recipes: [],
			user: { 
                uid: '',
                photoURL: '',
                displayName: '',
                email: '',
                savedRecipes: []
            }
		}

		this.setState({
			recipes: recipes
		})
	}

	saveRecipe(saveObject) {
		let self = this
		let database = this.props.database
		let uid = this.props.user.uid || 'no-authentication'

		// why props not state?
		if(uid != "no-authentication") {
			this.setState({
				user: {
					savedRecipes: this.state.user.savedRecipes.concat(saveObject)
				}
			})

			database.ref('save-recipe/' + uid).push({
				image: saveObject.image,
				title: saveObject.title,
				url: saveObject.url,
				recipe_id: saveObject.recipe_id,
			})
		} else {
			alert("Please sign in before added recipes!")
		}		

	}

	deleteRecipe(deleteObj) {
		let firebase = this.props.firebase
		let uid = this.props.user.uid



		var newData = this.state.user.savedRecipes.slice(); //copy array
		newData.splice(deleteObj.recipe_key, 1); //remove element
		this.setState({
			user: {
				savedRecipes: newData
			}
		}) //update state

		firebase.database().ref('save-recipe/'+ uid +"/"+ deleteObj.recipe_id).remove()
		console.log('========')
		console.log("delete recipe")
	}

	completedRecipe(event) {
		console.log('========')
		console.log("completed recipe")
	}

	render() {

		let recipesitems = this.state.recipes.map((recipe, index) => {
			return (
					<RecipeItem 
					key = {index}
					image = {recipe.recipe.image}
					title = {recipe.recipe.label}
					recipe_id = {recipe.recipe.label} 
					url = {recipe.recipe.url}
					saveRecipe={this.saveRecipe}/>
			)
		})

		let saveditems = this.state.user.savedRecipes.map((recipe, index) => {
			return (
					<SavedItems 
					recipe_key = {index}
					image = {recipe.image}
					title = {recipe.title}
					recipe_id = {recipe.recipe_id} 
					url = {recipe.url}
					deleteRecipe={this.deleteRecipe}
					completedRecipe={this.completedRecipe}/>
			)
		})


				
		return (
				<div className="container">
					<div className="row search-container">
						<div className="col-md-12">
							<Food renderRecipeItem={this.renderRecipeItem} />
						</div>	
					</div>
					<div className="row">
						<div className="col-md-8">
							{recipesitems}
						</div>
						<div className="col-md-4">
							{saveditems}
						</div>	
					</div>		
				</div>
			
		)
	}



}

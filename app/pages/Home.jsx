import React from 'react'
import RecipeItem from '../components/RecipeItem.jsx'
import RecipeStore from '../stores/RecipeStore'
import * as RecipeAction from "../actions/RecipeActions"
    
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: '',
            recipes: []
        }

        this.saveIngredients = this.saveIngredients.bind(this)
        this.searchRecipes = this.searchRecipes.bind(this)
        this.saveRecipe = this.saveRecipe.bind(this)
        this.displaySearch = this.displaySearch.bind(this)

        
    }

    componentWillMount() {
        RecipeStore.on('search', this.displaySearch)
    }

    saveIngredients(event) {
        this.setState({
            ingredients: event.target.value
        })
    }

    searchRecipes() {
        let search = this.state.ingredients
        RecipeAction.searchRecipe(search)
    }

    displaySearch() {
       this.setState({
            recipes: RecipeStore.getSearchResults()
       })
    }

    saveRecipe(build) {
        this.props.saveRecipeFn(build)
    } 

    render () {

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


        return (
            
            <div className="container-fluid">
                <div className="row search-container">
                    <div className="react-col col-md-12">
                        <input className="recipe-lookup" placeholder="Look up ingredients" onChange={this.saveIngredients} value={this.state.ingredients}/>
                    </div>
                    <div className="react-col col-md-12">
                        <button className="btn btn-primary" onClick={this.searchRecipes}>Search Recipes</button>
                    </div>
                </div>

                <div className="row results-container">
                    {recipesitems}
                </div>
            </div>   
            
        )
    }
}







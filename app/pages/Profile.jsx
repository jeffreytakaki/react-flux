import React from 'react'
import RecipeStore from '../stores/RecipeStore'
import RecipeItem from '../components/RecipeItem.jsx'
import * as RecipeActions from "../actions/RecipeActions"
import SavedItems from '../components/SavedItems.jsx'

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            savedRecipes: []
        }

        this.getSaved = this.getSaved.bind(this)
        this.deleteRecipe = this.deleteRecipe.bind(this)
        this.emptyBook = this.emptyBook.bind(this)
        this.welcomeName = this.welcomeName.bind(this)
        this.completedRecipe = this.completedRecipe.bind(this)

        RecipeStore.on("userChange", this.getSaved)
        RecipeStore.on("recipe-item", this.getSaved)
    }

    componentDidMount() {
        (RecipeStore.getUser().uid != undefined) ? this.getSaved() : false
    }

    getSaved() {
        this.setState({
            user: RecipeStore.getUser(),
            savedRecipes: RecipeStore.retrieveSaved()
        })
    }

    deleteRecipe(del_id) {
        RecipeActions.deleteRecipe(del_id)
    }

    completedRecipe(id,status) {
        RecipeActions.updateRecipe(id,status)
    }

    emptyBook() {
        return  (<div className="col-md-12 empty-cart">You haven&apos;t saved any recipes! </div>)
    }

    welcomeName() {
        return  (<div className="react-col col-md-12 welcome-container">Hi, <span className="bigandbold">{this.state.user.displayName}!</span></div>)
    }

    render () {
        
        let saveditems = this.state.savedRecipes.map((recipe, index) => {
            return (
                    <SavedItems 
                    key = {index}
                    image = {recipe.image}
                    title = {recipe.title}
                    recipe_id = {recipe.recipe_id}
                    completed = {recipe.completed} 
                    url = {recipe.url}
                    deleteRecipe={this.deleteRecipe}
                    completed={recipe.completed}
                    completedRecipe={this.completedRecipe}/>
            )
        })

        return (
        
            <div className="container-fluid">
                <div className="row">
                    { (this.state.user.uid != undefined) ? this.welcomeName() : ''}
                </div>
                 <div className="row results-container">
                    { (this.state.savedRecipes.length > 0) ? saveditems :this.emptyBook()}
                </div>
            </div>  
            
        )
    }
}







import React from 'react'
import RecipeStore from '../stores/RecipeStore'
import RecipeItem from '../components/RecipeItem.jsx'
import * as RecipeAction from "../actions/RecipeActions"
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
    }

    componentWillMount() {
        RecipeStore.on("userChange", this.getSaved);
    }


    getSaved() {
        this.setState({
            user: RecipeStore.getUser(),
            savedRecipes: RecipeStore.retrieveSaved()
        })
    }

    deleteRecipe(deleteObj) {
        var newData = this.state.savedRecipes.slice(); //copy array
        newData.splice(deleteObj.recipe_id, 1); //remove element
        this.setState({
            savedRecipes: newData
        }) //update state

        firebase.database().ref('save-recipe/'+ this.state.user.uid +"/"+ deleteObj.recipe_id).remove()
    }

    completedRecipe(event) {
        console.log('========')
        console.log("completed recipe")
    }

    render () {

        let saveditems = this.state.savedRecipes.map((recipe, index) => {
            return (
                    <SavedItems 
                    key = {index}
                    image = {recipe.image}
                    title = {recipe.title}
                    recipe_id = {recipe.recipe_id} 
                    url = {recipe.url}
                    deleteRecipe={this.deleteRecipe}
                    completedRecipe={this.completedRecipe}/>
            )
        })

        return (
        
            <div className="container-fluid">
                <div className="row">
                    <div className="react-col col-md-12 welcome-container">Hi, <span className="bigandbold">{this.state.user.displayName}!</span></div>
                </div>
                 <div className="row results-container">
                    {saveditems}
                </div>
            </div>  
            
        )
    }
}







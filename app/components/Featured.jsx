import React from 'react'
import RecipeStore from '../stores/RecipeStore'
import * as RecipeActions from "../actions/RecipeActions"
import RecipeItem from './RecipeItem.jsx'

export default class Featured extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'Save Recipe',
            featured: {}
        }

        this.getFeatured = this.getFeatured.bind(this)
        this.buildRecipe = this.buildRecipe.bind(this)
        this.displayButton = this.displayButton.bind(this)
        RecipeStore.on('featured',this.getFeatured)

        
    }

    componentWillMount() {
        RecipeActions.getFeaturedRecipe()

    }

    componentDidMount() {
        this.getFeatured()
    }

    getFeatured() {
        this.setState({
            featured: RecipeStore.getFeaturedRecipe()
        })
    }

    buildRecipe(event) {

        // go to the upmost parent to get attribute values
        let target = event.target.parentNode.parentNode.parentNode.parentNode
        // build save object
        let saveObject = {
            image: target.dataset.image,
            title: target.dataset.title,
            url: target.dataset.url,
            recipe_id: Date.now(),
            calories: target.dataset.calories,
            yield: target.dataset.yield,
            completed: false
        }

        RecipeActions.createRecipe(saveObject)

        this.setState({
            selected: 'Saved!'
        })
    }

    displayButton() {
        if(this.state.selected == "Save Recipe") {
            return <button onClick={this.buildRecipe} className='btn btn-info'>Save Recipe</button>
        } else {
            return <button onClick={this.buildRecipe} className='btn btn-warning'>Saved!</button>   
        }
    }

    render () {

        return (
            <div className="container-fluid">
                <div className="row featured-container" data-recipe_id={this.state.featured.recipe_id} data-title={this.state.featured.label} data-url={this.state.featured.url} data-image={this.state.featured.image} data-calories={this.state.featured.calories} data-yield={this.state.featured.yield}>
                    <div className="col-md-12 featured-day-title">
                        <h4>Today&#39;s Featured Recipe</h4>
                    </div>
                    <div className="col-md-12 featured-recipe-title">
                        <h3>{this.state.featured.label}</h3>
                    </div>
                    <div className="col-md-12 featured-image">
                        <a href={this.state.featured.url} target="_blank">
                            <img src={this.state.featured.image} alt={this.state.featured.label}/>
                        </a>
                    </div>
                    <div className="col-md-12">
                        <p><span className="calories-bold">{ parseInt(this.state.featured.calories) }</span> Calories</p>
                    </div>
                    <div className="col-md-12">
                        <p><span className="calories-bold">{ parseInt(this.state.featured.yield) }</span> Servings</p>   
                    </div>
                    <div className="col-md-12 recipe-col">
                        <div className="row">
                            <div className="col-md-12">
                                {this.displayButton()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}







import React from 'react'
import RecipeStore from '../stores/RecipeStore'
import * as RecipeAction from "../actions/RecipeActions"

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            savedRecipes: []
        }

        this.getSaved = this.getSaved.bind(this)
    }

    componentWillMount() {
        RecipeStore.on("userChange", this.getSaved);
    }

    getSaved() {

        this.setState({
            user: RecipeStore.getUser(),
            savedRecipes: RecipeStore.getSaved()

        })
    }

    render () {
        return (
        
            <div className="container-fluid">
                <div className="row">
                    <div className="react-col col-md-12">Hi, {this.state.user.displayName}!</div>
                </div>
                <div className="row">
                    <div className="react-col col-md-6"></div>
                    <div className="react-col col-md-6"></div>
                </div>
                <div className="row">
                    <div className="react-col col-md-6"></div>
                    <div className="react-col col-md-6"></div>
                </div>
            </div>  
            
        )
    }
}







import React from 'react'
import Featured from './Featured.jsx'
import Home from '../pages/Home.jsx'
import Profile from '../pages/Profile.jsx'
import Nav from './Nav.jsx'
import firebaseSignIn from '../utils/signin'
import * as RecipeActions from "../actions/RecipeActions";

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
                database: {},
                firebase: {},
                user:{},
                savedRecipes: []

        }
        
    }


    render () {
        let self = this

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="react-col col-md-12">
                        <Nav signIn={this.signIn} user={this.state.user} LoggedIn={this.LoggedIn}/>
                    </div>
                </div>
                <div className="row">
                    <div className="react-col col-md-9">
                        {this.props.children}

                    </div>
                    <div className="react-col col-md-3">
                        <Featured />
                    </div>
                </div>
            </div>   
        )
    }
}







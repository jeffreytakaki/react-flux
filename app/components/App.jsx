import React from 'react'
import Sidebar from './Sidebar.jsx'
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
                savedRecipes: [],
                saveRecipeFn: this.saveRecipe 

        }

        this.saveRecipe = this.saveRecipe.bind(this)
        
    }

    componentWillMount() {

    }

    // signIn(event) {
    //     firebaseSignIn().then(user => {
    //         this.setState({
    //             user: user
    //         })
    //     })
    // }

    saveRecipe(build) {
        console.log(build)

        RecipeActions.createRecipe(build)

        // this.setState({
        //     savedRecipes: this.state.savedRecipes.concat(build)
        // })

        console.log(this.state)
    } 



    render () {
        let self = this
        // let children = React.Children.map(this.props.children, function (child) {
        //     return React.cloneElement(child, {    
        //         saveRecipeFn: self.state.saveRecipeFn,
        //         state: self.state
        //     })
        // })

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
                        <Sidebar />
                    </div>
                </div>
            </div>   
        )
    }
}







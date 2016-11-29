import React from 'react'
import {Link} from 'react-router'
import RecipeStore from '../stores/RecipeStore'
import * as RecipeAction from "../actions/RecipeActions"

export default class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            LoggedIn: 'Sign In',
            user: {}
        }

        this.handleSignIn = this.handleSignIn.bind(this)
        this.getUser = this.getUser.bind(this)
    }

    componentWillMount() {
        RecipeStore.on('userChange',this.getUser)
    }

    handleSignIn(event) {
        RecipeAction.userLogin(event)
    }

    getUser(user) {
        this.setState({
            user: RecipeStore.getUser()
        })
    }
    
    render () {

        return (
            <nav>
                <div className="container-fluid">
                    <div className="row">
                        <div className="react-col col-md-6">
                            <h1>N A V</h1>
                        </div>
                        <div className="react-col col-md-6">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="react-col col-md-6">
                                        <div className="nav-link-col"><Link to="home">Home</Link></div>
                                        <div className="nav-link-col"><Link to="profile">Profile</Link></div>
                                    </div>
                                    <div className="react-col col-md-6">
                                        <div className="nav-link-col">
                                            <button className="btn btn-primary sign-in-button" onClick={this.handleSignIn}>{ (this.state.user.uid == undefined) ? 'Sign In' : 'Sign Out' }</button>
                                        </div>
                                        <div className="nav-link-col"><img src={this.state.user.photoURL} /></div>
                                              
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </nav>
            
        )
    }
}







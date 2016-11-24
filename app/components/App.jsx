import React from 'react'
import Sidebar from './Sidebar.jsx'
import Home from '../pages/Home.jsx'
import Profile from '../pages/Profile.jsx'
import Nav from './Nav.jsx'
import firebaseSignIn from '../utils/signin.js'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
                database: {},
                firebase: {},
                user:{},
                savedRecipes: []           
        }

        this.signIn = this.signIn.bind(this)
    }

    

    componentWillMount() {

    }

    signIn(event) {
    
        firebaseSignIn().then(user => {
            this.setState({
                user: user
            })
        })
    }

    render () {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="react-col col-md-12">
                        <Nav signIn={this.signIn} user={this.state.user}/>
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







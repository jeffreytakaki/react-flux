import React from 'react'
import {Link} from 'react-router'

export default class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }

        this.handleSignIn = this.handleSignIn.bind(this)

    }

    handleSignIn(event) {
        console.log(this.props)
        this.props.signIn(event)
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
                                        <div className="nav-link-col"><button className="btn btn-primary sign-in-button" onClick={this.handleSignIn}>Sign In</button></div>
                                        <div className="nav-link-col"><img src={this.props.user.photoURL} /></div>
                                              
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







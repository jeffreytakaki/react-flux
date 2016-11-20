import React from 'react'
import Sidebar from './Sidebar.jsx'
import Home from '../pages/Home.jsx'
import Profile from '../pages/Profile.jsx'
import Nav from './Nav.jsx'



export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
                item: ''
                    
        }

    }

    render () {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="react-col col-md-12">
                        <Nav />
                    </div>
                </div>
                <div className="row">
                    <div className="react-col col-md-3">
                        <Sidebar />
                    </div>
                    <div className="react-col col-md-9">
                        {this.props.children}
                    </div>
                </div>
            </div>   
        )
    }
}







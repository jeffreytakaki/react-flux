import React from 'react'
import {Link} from 'react-router'

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }

    }

 

    render () {
        return (
            <ul>
                <li><Link to="home">Home</Link></li>
                <li><Link to="profile">Profile</Link></li>
            </ul>
            
        )
    }
}







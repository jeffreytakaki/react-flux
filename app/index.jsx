import React from 'react'
import ReactDOM from 'react-dom'
import {Route, Router, IndexRoute, hashHistory} from 'react-router'
import App from './components/App.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'


ReactDOM.render(
    
	<Router history={hashHistory}>
			<Route path='/' component={App}>
				<IndexRoute component={Home}/>
                <Route path='home' component={Home}></Route>
                <Route path='profile' component={Profile}></Route>
            </Route>
	</Router>
    , document.getElementById('app'));









import React from 'react'
import ReactDOM from 'react-dom'
import {Route, Router, hashHistory} from 'react-router'


import Nav from './pages/Nav.jsx'
import App from './pages/App.jsx'
import Show from './pages/Show.jsx'



class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            database: {},
            firebase: {},
            user:{
                uid: '',
                photoURL: '',
                displayName: '',
                email: '',
                savedRecipes: []
            }
        }

        this.toggleSignIn = this.toggleSignIn.bind(this)
        this.saveUser = this.saveUser.bind(this)
        this.getRecipes = this.getRecipes.bind(this)

    }

    componentWillMount() {
        var config = {
            apiKey: "AIzaSyC1I-eTkRWrTekurEs2tepEMxlaIQUTNkk",
            authDomain: "save-recipe.firebaseapp.com",
            databaseURL: "https://save-recipe.firebaseio.com",
            storageBucket: "save-recipe.appspot.com",
            messagingSenderId: "348011917644"
        };
        let firebaseInit = firebase.initializeApp(config);
        let firebaseDatabase = firebase.database();

        this.setState({
            database: firebaseDatabase,
            firebase: firebase
        })
    }

    toggleSignIn() {
        var self = this

        let firebase = this.state.firebase
        let database = this.state.database


        if (!firebase.auth().currentUser) {
            var provider = new firebase.auth.FacebookAuthProvider();
            provider.addScope('user_birthday');
            firebase.auth().signInWithPopup(provider).then(function(result) {
                var token = result.credential.accessToken;
                var user = result.user;
                self.saveUser(user)
                
            }).then()
            .catch(function(error) {
                
                var errorCode = error.code;
                var errorMessage = error.message;
                
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // [START_EXCLUDE]
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    alert('You have already signed up with a different auth provider for that email.');
                    // If you are using multiple auth providers on your app you should handle linking
                    // the user's accounts here.
                } else {
                    console.error(error);
                }
                // [END_EXCLUDE]
            });
        } else {
            firebase.auth().signOut();
        }
        
    }
    // [END buttoncallback]

    saveUser(user) {
        var self = this
        var saved = []
        saved = this.getRecipes(user.uid)

        this.setState({
            user: {
                uid: user.uid,
                photoURL: user.photoURL,
                displayName: user.displayName,
                email: user.email,
                savedRecipes:saved
            }
        })

        console.log("=====")
        console.log(this.state)



    }

    getRecipes(uid) {
        var self = this
        let firebase = this.state.firebase
        let saved =[]
        
        firebase.database().ref('/save-recipe/' + uid).once('value').then(function(snapshot) {
            
            // let getsnap = snapshot.val()
            // getsnap.forEach(function(data,index){      
            //     console.log(index)
            //     saved.push(data.val())
            // })

            let getsnap = snapshot.val()
            for (var k in getsnap){
                if (getsnap.hasOwnProperty(k)) {
                    let obj = {
                        recipe_id: k,
                        image: getsnap[k].image,
                        title: getsnap[k].title,
                        url: getsnap[k].url
                    }
                    saved.push(obj)
                }
            }
        })
        
        return saved 
    }

    render () {
        return (
            <div>
                <Nav firebase={this.state.firebase} database={this.state.database} user={this.state.user} toggleSignIn={this.toggleSignIn}/>
                <App firebase={this.state.firebase} database={this.state.database} user={this.state.user} />
            </div>
        )
    }
}


ReactDOM.render(<Home />, document.getElementById('app'));


// ReactDOM.render((
// 	<Router>
// 			<Route path='/' component={App} />
// 			<Route path='/home' component={Home} />
// 			<Route path='/show' component={Show} />
	
// 	</Router>


// ), document.getElementById('app'));









import { EventEmitter } from "events"
import dispatcher from "../dispatcher"
import getRecipes from '../utils/getRecipes'
import firebaseSignIn from '../utils/signin'
import getSaved from '../utils/getSaved'

class RecipeStore extends EventEmitter {
    constructor() {
        super()
        this.recipes = []
        this.saved = []
        this.user = this.getInitial() || []
        this.featured = {}
      
    }

    getInitial() {
        return firebase.auth().currentUser
    }

    searchRecipes(search) {
        let self = this
        getRecipes(search.data).then(results => {
            this.recipes = results
            self.emit("search")
        })

    }

    queryFeaturedRecipe() {
        // get featured recipe of the day. random selection based on combinations array;
        let self = this
        if(self.featured.length == undefined) {
            let combinations = ['fish','chicken','beef','lamb','cookies','yellow cake','pancakes','waffles','turkey','garlic']
            let min = 0
            let max = 9
            let random = Math.floor(Math.random() * (max - min + 1)) + min

            getRecipes(combinations[random]).then(results => {
                self.featured = results[random].recipe
                self.emit("featured")
            })   
        }  
    }


    login(action) {
        if(!firebase.auth().currentUser) {

            firebaseSignIn().then(user => {
                this.user = user
                
                getSaved(this.user.uid).then(results => {
                    this.saved = results
                    this.emit("userChange")        
                })
            })

        } else {
            this.user = firebase.auth().currentUser
            getSaved(this.user.uid).then(results => {
                this.saved = results
                this.emit("userChange")        
            })
        }

    }

    logout(action) {
        firebase.auth().signOut()
        this.user=[]
        this.saved=[]
        this.emit("userChange")        

    }

    createRecipe(data) {

        if(firebase.auth().currentUser) { 
            
            this.saved.push({
                image: data.data.image,
                title: data.data.title,
                url: data.data.url,
                recipe_id: data.data.recipe_id,
                calories: data.data.calories,
                yield: data.data.yield,
                completed: false
            })

            firebase.database().ref('save-recipe/' + this.user.uid).push({
                image: data.data.image,
                title: data.data.title,
                url: data.data.url,
                recipe_id: data.data.recipe_id,
                calories: data.data.calories,
                yield: data.data.yield,
                completed: false,
            })


            this.emit("recipe-item")
        }

        
    }

    updateRecipe(id,status) {
        let self = this
        firebase.database().ref('save-recipe/' + this.user.uid + '/' + id).update({
            completed: status,
        }).then(function() {

            self.saved.forEach(function(current, index) {
                if(current.recipe_id == id) {
                    current.completed = status
                }
            })

            self.emit("recipe-item")   
        })

    }

    deleteRecipe(id) {
        let self = this

        firebase.database().ref('save-recipe/' + this.user.uid + '/' + id).remove()

        this.saved.forEach((current,index) => {
            if(current.recipe_id == id) {
                self.saved.splice(index, 1)
                self.emit("recipe-item")
            }
        })
    }

    getSearchResults() {
        return this.recipes
    }

    getFeaturedRecipe() {
        return this.featured
    }

    retrieveSaved() {
        return this.saved
    }

    getUser() {
        return this.user
    }

    handleActions(action) {
        switch(action.type) {
            case "SEARCH_RECIPE": {
                this.searchRecipes(action);
                this.emit("change");
                break;
            }
            case "CREATE_RECIPE": {
                this.createRecipe(action);
                break;
            }
            case "RETRIEVE_RECIPE": {
                this.retrieveRecipes(this.user.uid)
                this.emit("change");
                break;
            }
            case "RETRIEVE_FEATURED": {
                this.queryFeaturedRecipe()
                this.emit("change");
                break;
            }
            case "DELETE_RECIPE": {
                this.deleteRecipe(action.id)
                this.emit("change");
                break;
            }
            case "UPDATE_RECIPE": {
                this.updateRecipe(action.id,action.status)
                this.emit("change");
                break;
            }
            case "USER_LOGIN": {
                this.login(action);
                break;
            }
            case "USER_LOGOUT": {
                this.logout(action);
                break;
            }
        }
    }

}

const recipeStore = new RecipeStore;
dispatcher.register(recipeStore.handleActions.bind(recipeStore));

export default recipeStore



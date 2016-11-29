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
        this.user = []
      
    }

    searchRecipes(search) {
        let self = this
        getRecipes(search.data).then(results => {
            this.recipes = results
            self.emit("search")
        })

    }

    login(action) {
        let self = this
        firebaseSignIn().then(user => {
            this.user = user
            this.emit("userChange")        
        })
    }

    getSaved(user) {
        let self = this
        getSaved(this.user.uid).then(saved => {

            this.saved = saved
        })

    }

  createRecipe(data) {
   console.log(data)

    this.saved.push({
  		image: data.data.image,
		title: data.data.title,
		url: data.data.url,
		recipe_id: data.data.key,
		completed: false
    });

    this.emit("change");
  }

  getSearchResults() {
    return this.recipes;
  }

  getSaved() {
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
      case "RECEIVE_RECIPE": {
        this.recipes = action.recipes;
        this.emit("change");
        break;
      }
      case "RECEIVE_SAVED": {
        this.saved = action.user;
        this.emit("change");
        break;
      }
      case "DELETE_RECIPE": {
        this.recipes = action.recipes;
        this.emit("change");
        break;
      }
      case "USER_LOGIN": {
        this.login(action);
        break;
      }
    }
  }

}

const recipeStore = new RecipeStore;
dispatcher.register(recipeStore.handleActions.bind(recipeStore));

export default recipeStore



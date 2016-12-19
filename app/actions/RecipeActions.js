import dispatcher from "../dispatcher";

export function searchRecipe(data) {
    dispatcher.dispatch({
        type: "SEARCH_RECIPE",
        data,
    });
}

export function getSavedRecipes(user) {
    dispatcher.dispatch({
        type: "RETRIEVE_SAVED",
        user,
    });
}

export function getFeaturedRecipe() {
    dispatcher.dispatch({
        type: "RETRIEVE_FEATURED"
    });
}


export function createRecipe(data) {
    dispatcher.dispatch({
        type: "CREATE_RECIPE",
        data,
    });
}

export function deleteRecipe(id) {
    dispatcher.dispatch({
        type: "DELETE_RECIPE",
        id,
    });
}

export function updateRecipe(id,status) {
    dispatcher.dispatch({
        type: "UPDATE_RECIPE",
        id,
        status
    });
}

export function userLogin(event) {
    dispatcher.dispatch({
        type: "USER_LOGIN",
        event,
    });
}

export function userLogout(event) {
    dispatcher.dispatch({
        type: "USER_LOGOUT",
        event,
    });
}


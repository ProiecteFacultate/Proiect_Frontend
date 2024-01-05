import { act } from "react-dom/test-utils";
import { combineReducers } from "redux";

const userData = (state = {isAuthenticated : false, username : "", tag : ""}, action : any) => {
    switch(action.type) {
        case 'LOG_IN_USER_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}

const visitedProfileData = (state = {username : "", tag : ""}, action : any) => {
    switch(action.type) {
        case 'VISIT_PROFILE':
            return action.payload;
        default:
            return state;
    }
}

const reducersList = combineReducers({
    userData
})

export default reducersList;
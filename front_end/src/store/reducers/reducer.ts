import { act } from "react-dom/test-utils";
import { combineReducers } from "redux";

const authenticationData = (state = {username : "", isAuthenticated : true}, action : any) => {
    if(action.type === 'LOG_IN_USER_SUCCESS') {
        return action.payload;
    }

    return state;
}
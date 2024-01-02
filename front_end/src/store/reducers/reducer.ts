import { act } from "react-dom/test-utils";
import { combineReducers } from "redux";

const userData = (state = {isAuthenticated : false, username : ""}, action : any) => {
    switch(action.type) {
        case 'LOG_IN_USER_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}

const reducersList = combineReducers({
    userData
})

export default reducersList;
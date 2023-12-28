import { combineReducers } from "redux";

const testReducer = (state = [], action : any) => {
    return state;
}

const reducersList = combineReducers ({
    testReducer
})

export default reducersList;
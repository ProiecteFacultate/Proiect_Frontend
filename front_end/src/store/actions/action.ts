export const logInUser = (payload : any) : any => {
    return {
        type : "LOG_IN_USER_SUCCESS",
        payload : payload
    }
}

export const visitProfile = (payload : any) : any => {
    return {
        type : "VISIT_PROFILE",
        payload : payload
    }
}
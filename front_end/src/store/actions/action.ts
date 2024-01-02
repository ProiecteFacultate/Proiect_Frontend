export const logInUser = (payload : any) : any => {
    return {
        type : "LOG_IN_USER_SUCCESS",
        payload : payload
    }
}
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

export const viewPhotoPost= (payload : any) : any => {
    return {
        type : "VIEW_PHOTO_POST",
        payload : payload
    }
}
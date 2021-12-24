import {UserState, UserAction, UserActionTypes} from '../types/userTypes'


const initialState: UserState = {
    user: null,
    error: null,
}


export const UserReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.CREATEUSER:
            return state
        case UserActionTypes.GETUSER:
            return {...state, user: action.payload}
        case UserActionTypes.ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}

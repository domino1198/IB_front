export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    login: string,
}




export interface UserState {
    user: User | null,
    error: string | null,
}

export enum UserActionTypes {
    LOGIN = "LOGIN",
    GETUSER = "GETUSER",
    ERROR = "ERROR",
    CREATEUSER = "CREATEUSER",
}


interface UserLogin {
    type: UserActionTypes.LOGIN;
    payload: string;
}

interface GetUser {
    type: UserActionTypes.GETUSER
    payload: User
}

interface ErrorUser {
    type: UserActionTypes.ERROR
    payload: string
}

interface CreateUser {
    type: UserActionTypes.CREATEUSER
    payload: undefined
}


export type UserAction = UserLogin | CreateUser | ErrorUser | GetUser;

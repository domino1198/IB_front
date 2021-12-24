import {UserActionTypes} from '../types/userTypes'
import axios, {} from "axios";

export const ClearError = () => (dispatch: any) => dispatch({type: UserActionTypes.ERROR, payload: null});
export const ClearUser = () => (dispatch: any) => dispatch({type: UserActionTypes.GETUSER, payload: null});

export const PostUser = (login: string, password: string) => {
    return async (dispatch: any) => {
        try {
            const res = await axios.post('/signIn', {login: login, password: password});
            if (res.data.error) {
                dispatch({type: UserActionTypes.ERROR, payload: "Incorrect login or password"})
            } else {
                dispatch(ClearError())
                dispatch({type: UserActionTypes.GETUSER, payload: res.data})
            }
        } catch (e) {
        }
    }
}

export const PutUser = (login: string, firstName: string, lastName: string,id:string) => {
    return async (dispatch: any) => {
        try {
            console.log({login: login, fName:firstName,lName:lastName,id:id})
            const res = await axios.post('/user-put', {login: login, fName:firstName,lName:lastName,id:id});
            console.log(res);
            if (res.data.error) {
                dispatch({type: UserActionTypes.ERROR, payload: "Incorrect login or password"})
            } else {
                dispatch(ClearError())
                dispatch({type: UserActionTypes.GETUSER, payload: res.data})
            }
        } catch (e) {
        }
    }
}



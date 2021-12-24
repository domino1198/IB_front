import {persistReducer } from "redux-persist";
import { rootReducer } from "./rootReducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware} from "redux";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "root",
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store: any = createStore(persistedReducer, applyMiddleware(thunk));

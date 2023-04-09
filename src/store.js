import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productReducers";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
    //combineReducers - to combine all the reducers
    combineReducers({ 
        products: productsReducer,
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk)) //compose - to compose all middlewares together
);

export default store;
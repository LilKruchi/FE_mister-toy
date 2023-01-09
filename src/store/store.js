// const { createStore, combineReducers } = Redux

import { combineReducers, legacy_createStore as createStore } from 'redux'
import { toyReducer } from './reducers/toy.reducer.js'

// import { todoReducer } from "./todo.reducer.js"
// import { userReducer } from "./user.reducer.js"

// import { userService } from "../services/user.service.js"

const rootReducer = combineReducers({
    toyModule: toyReducer
})

export const store = createStore(rootReducer)


// For debug only!
store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})
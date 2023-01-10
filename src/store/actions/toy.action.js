import { toyService } from "../../services/toy.service.js";
import { store } from '../store.js'
import { SET_TOYS, DELETE_TOY, ADD_TOY, UPDATE_TOY } from "../reducers/toy.reducer.js";

export function loadToys(filterBy) {
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('Had an error with loading toys', err);
            throw err
        })
}

export function saveToys(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    toy.createdAt = new Date().getTime()
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
        })
        .catch(err => {
            console.log('Had an error with saving toy', err);
            throw err
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: DELETE_TOY, toyId })
        })
        .catch(err => {
            console.log('Had an error with removing toy', err);
            throw err
        })
}
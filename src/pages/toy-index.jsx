import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ToyFilter } from "../cmps/toy-filter.jsx"
import { ToyList } from "../cmps/toy-list.jsx"

import { loadToys, saveToys, removeToy } from "../store/actions/toy.action.js"

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        onLoadToys()
    }, [])

    function onLoadToys(filterBy) {
        loadToys(filterBy)
            .then(() => {
                console.log('Loaded toys');
            })
            .catch(err => {
                console.log('Had an error with loading toys', err);
            })
    }

    function onRemoveToy(ev, toyId) {
        ev.preventDefault();
        removeToy(toyId)
            .then(() => {
                console.log('removed toy');
            })
            .catch(err => {
                console.log('Had an error with removing toy', err);
            })
    }

    function onEditToy(ev, toy) {
        ev.preventDefault();
        const name = prompt('Enter a new name')
        const price = +prompt('Enter a new price')

        const newToy = { ...toy, name, price }
        saveToys(newToy)
            .then(savedToy => {
                console.log('Changed toys data');
            })
            .catch(err => {
                console.log('Had an error with removing toy', err);
            })
    }

    function onSetFilter(filterBy) {
        console.log('filtering toys', filterBy)
        onLoadToys(filterBy)
    }

    return (
        <section className="index-cmps-container">
            <div className="filter-container">
                <div className="add-container">
                    <Link className="add-toy link-btn main-layout" to="/toy/edit"><div>Add Toy</div></Link>
                </div>
                <ToyFilter onSetFilter={onSetFilter} />
            </div>

            <section className="toys-display">
                <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />
            </section>
        </section >
    )
}
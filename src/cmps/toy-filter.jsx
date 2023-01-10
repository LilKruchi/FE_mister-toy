import { useEffect, useRef, useState } from "react"
import Select from 'react-select'

import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"


export function ToyFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    const [isChecked, setIsChecked] = useState(false)
    onSetFilter = useRef(utilService.debounce(onSetFilter))
    let toyLabels = toyService.labels
    const options = toyLabels.map(label => ({ value: label, label }))
    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
        setIsChecked(!isChecked)
    }, [filterByToEdit])

    function handleChange({ target }, value) {
        if (target) {
            let { value, name: field, type } = target
            value = (type === 'number') ? +value : value
            if (target.checked) {
                setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value, inStock: false }))
            } else {
                setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value, inStock: true }))
            }
        } else {
            console.log('value', value.action);
            if (value.action === 'clear') {
                setFilterByToEdit(prevToy => ({ ...prevToy, labels: [...prevToy.labels] }))
            }
            if (value.action === 'remove-value') {
                setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: prevFilter.labels.filter(label => label !== value.removedValue.label) }))
            } else {
                setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: [...prevFilter.labels, value.option.label] }))
            }
        }
    }
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="toy-filter">
        <h2 className="filter-title">Toys Filter</h2>
        <form className="form-container" onSubmit={onSubmitFilter}>
            <label htmlFor="name">Name:
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By name..."
                    value={filterByToEdit.name}
                    onChange={handleChange}
                    ref={elInputRef}
                />
            </label>

            <label htmlFor="price">Price:
                <input type="number"
                    id="price"
                    name="price"
                    placeholder="By price..."
                    value={filterByToEdit.price}
                    onChange={handleChange}
                />
            </label>

            <label htmlFor="stock" >
                <input type="checkbox" value={filterByToEdit.inStock}
                    id="stock"
                    name="inStock"
                    onChange={handleChange}
                />
                In stock ?
            </label>


            <Select className="multi-select" options={options}
                isMulti
                name="labels"
                onChange={handleChange}
            // value={filterByToEdit.labels ? filterByToEdit.labels.map(label => ({ value: label, label })) : []}
            />
        </form>

    </section >
}
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Select from 'react-select'


import { toyService } from "../services/toy.service.js";
import { saveToys } from "../store/actions/toy.action.js";
import { LabelCheckbox } from "./label-checkbox.jsx";
import { LoadingSpinner } from "./loading-spinner.jsx";

export function ToyEdit() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    let toyLabels = toyService.labels
    const options = toyLabels.map(label => ({ value: label, label }))


    useEffect(() => {
        if (!toyId) return
        getToy()
    }, [])


    function getToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Error getting toy', err);
            })
    }

    function handleChange({ target }, value) {
        if (target) {

            let { value, type, name: field } = target
            value = (type === 'number') ? +value : value

            setToy(prevToy => ({ ...prevToy, [field]: value }))
        } else {
            console.log(value);
            if (value.action === 'remove-value') {
                setToy(prevToy => ({ ...prevToy, labels: prevToy.labels.filter(label => label !== value.removedValue.label) }))
            } else {
                setToy(prevToy => ({ ...prevToy, labels: [...prevToy.labels, value.option.label] }))
            }
        }

        // newBug(bugToEdit)
    }
    console.log(toy);

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToys(toy)
            .then(toy => {
                console.log('Saved toy', toy)
                navigate('/toy')
            })
    }

    if (!toy) return <LoadingSpinner />
    return (
        <form onSubmit={onSaveToy}>
            <label htmlFor="name">Toy name:</label>
            <input type="text"
                name="name"
                id="name"
                placeholder={typeof todoId === 'string' ? 'Edit Toys namr...' : 'Enter new Toys name...'}
                value={toy.name}
                required
                onChange={handleChange} />

            <label htmlFor="price">Toy price:</label>
            <input type="number"
                name="price"
                id="price"
                placeholder={typeof todoId === 'string' ? 'Edit Toys text...' : 'Enter new Toy...'}
                value={toy.price}
                required
                onChange={handleChange} />

            <label htmlFor="img">Toy img:</label>
            <input type="file"
                name="img"
                id="img" />
            <div className="checkbox-container">
                <h3>Toy labels:</h3>
                {/* {toyLabels.map(label =>
                    <LabelCheckbox toy={toy} label={label} handleChange={handleChange} />
                )} */}
                <Select options={options}
                    isMulti
                    name="labels"
                    onChange={handleChange}
                    value={toy.labels ? toy.labels.map(label => ({ value: label, label })) : []}
                />
            </div>


            <button>save</button>

        </form>
    )
}


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Select from 'react-select'


import { toyService } from "../services/toy.service.js";
import { saveToys } from "../store/actions/toy.action.js";
import { LoadingSpinner } from "./loading-spinner.jsx";

export function ToyEdit() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(toyService.getEmptyToy())
    const [checked, setChecked] = useState(toy.inStock === 'on' ? true : false)
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
        setChecked(!checked)
        if (target) {
            let { value, type, name: field } = target
            value = (type === 'number') ? +value : value

            if (type === 'checkbox') {
                console.log(checked);
                toy.inStock = checked ? 'on' : false
                setToy(prevToy => ({ ...prevToy, inStock: false }))
            }

            if (type === 'file') {
                console.log('value');
            }

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
    // console.log(toy.inStock);
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
        <form className="edit-container" onSubmit={onSaveToy}>
            <div className="input-container">
                <h2 className="edit-title">{toyId ? `Currently editing: ${toy.name}` : 'Create a new toy listing'}</h2>
                <label htmlFor="name">Toy name:
                    <input type="text"
                        name="name"
                        id="name"
                        placeholder={typeof todoId === 'string' ? 'Edit Toys namr...' : 'Enter new Toys name...'}
                        value={toy.name}
                        required
                        onChange={handleChange} />
                </label>

                <label htmlFor="price">Toy price:
                    <input type="number"
                        name="price"
                        id="price"
                        placeholder={typeof todoId === 'string' ? 'Edit Toys text...' : 'Enter new Toy...'}
                        value={toy.price}
                        required
                        onKeyDown={(ev) => {
                            if (!/[0-9]/.test(ev.key)) {
                                ev.preventDefault();
                            }
                        }}
                        onChange={handleChange} />
                </label>

                <label htmlFor="img">Toy img:
                    <input type="file"
                        name="img"
                        accept=".png, .jpg"
                        onChange={handleChange}
                        id="img" />
                </label>

                <label htmlFor="checkbox">
                    <input type="checkbox"
                        name="inStock"
                        value={!checked ? 'on' : !!false}
                        checked={toy.inStock === 'on' ? 'on' : !!false}
                        onChange={handleChange}
                        id="checkbox" />
                    Do you have stock of the toy?
                </label>

                <div className="checkbox-container">

                    <label htmlFor="multi-select"> Toy labels:
                        <Select options={options}
                            isMulti

                            id="multi-select"
                            name="labels"
                            onChange={handleChange}
                            value={toy.labels ? toy.labels.map(label => ({ value: label, label })) : []}
                        />
                    </label>
                </div>


                <button className="form-submit">SAVE</button>
            </div>
        </form>
    )
}


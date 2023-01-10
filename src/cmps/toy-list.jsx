import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import { ToyPreview } from "./toy-preview"
export function ToyList({ toys, onRemoveToy, onEditToy }) {
    return (
        <>
            {toys.map(toy => {
                // console.log(toy.inStock);

                let isInStockClass = toy.inStock ? '' : 'not-in-stock'
                return (

                    <Link to={`/toy/${toy._id}`} className={"toy " + isInStockClass} key={toy._id} onClick={() => console.log(toy._id)}>

                        <ToyPreview toy={toy} isInStockClass={isInStockClass} />

                        <div className={"button-container " + isInStockClass}>
                            <button onClick={(ev) => onRemoveToy(ev, toy._id)}><FontAwesomeIcon className='btn-icon' icon={faXmark} /></button>
                            <Link className="link-btn" to={`/toy/edit/${toy._id}`} ><FontAwesomeIcon className='btn-icon' icon={faPen} /></Link>
                        </div>


                    </Link>
                )
            })}
        </>
    )
}

//onClick={(ev) => onEditToy(ev, toy)}
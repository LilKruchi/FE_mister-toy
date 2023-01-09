import { Link } from "react-router-dom"
import { ToyPreview } from "./toy-preview"

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    return (
        <>
            {toys.map(toy => {
                return (
                    <Link to={`/toy/${toy._id}`} className="toy" key={toy._id} onClick={() => console.log(toy._id)}>
                        <ToyPreview toy={toy} />

                        <div className="button-container">
                            <button onClick={(ev) => onRemoveToy(ev, toy._id)}>x</button>
                            <Link to={`/toy/edit/${toy._id}`} >Edit</Link>
                        </div>

                    </Link>
                )
            })}
        </>
    )
}

//onClick={(ev) => onEditToy(ev, toy)}
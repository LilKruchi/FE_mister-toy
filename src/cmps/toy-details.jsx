import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import { LoadingSpinner } from "./loading-spinner";
import { toyService } from "../services/toy.service";



export function ToyDetails() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(toyService.getEmptyToy())

    useEffect(() => {
        getToy()
    }, [])

    function getToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Error getting toy', err);
            })
    }

    if (!toy) return <LoadingSpinner />
    return (
        <section className="toy-details-content">
            <p>Store ID: {toy._id}</p>

            <div className="img-container"><img src={toy.img} alt="" /></div>

            <div></div>
        </section>
    )
}
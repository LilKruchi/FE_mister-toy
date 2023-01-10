import { useState } from "react";
import GoogleMap from "../cmps/map/google-map";

export function About() {
    const [coords, setCoords] = useState({ center: { lat: 31.787864376924034, lng: 34.637242592595705 }, zoom: 11 })

    const changeLocation = (lat, lng, zoom = 14) => {
        setCoords(prevCoords => ({ ...prevCoords, center: { ...prevCoords.center, lat, lng }, zoom }))
    }
    const handleClick = ({ lat, lng }) => {
        setCoords({ center: { lat, lng } })
    }
    return (
        <section className="about">
            <aside>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab corrupti recusandae a fuga, sed facilis perspiciatis, deleniti, vitae voluptatibus blanditiis consequuntur mollitia at soluta iure debitis sint libero alias illo!
                Quae enim commodi eligendi tempora accusantium impedit, adipisci, dolores incidunt aperiam sit eos in dignissimos ipsa earum, praesentium deleniti cumque. Praesentium impedit eum omnis rem nesciunt cumque doloremque esse officia!
                <h2>Store history:</h2>

                <div className="city-container">
                    <h2>Store locations:</h2>
                    <button onClick={() => { changeLocation(32.09489605074698, 34.8648288345935, 13) }}>Petach tikva</button>
                    <button onClick={() => { changeLocation(31.787864376924034, 34.637242592595705, 13) }}>Ashdod</button>
                    <button onClick={() => { changeLocation(31.2535509431709, 34.79583312530979, 13) }}>Beer Sheva</button>
                </div>

            </aside>
            <div className="map-container">
                <GoogleMap coords={coords} handleClick={handleClick} />
            </div>
        </section>
    )
}


import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
const style = { color: 'white', background: 'blue', padding: '10px 10px', borderRadius: '50%', textAlign: 'center', display: 'inline-flex' }
const Ashdod = ({ text }) => <div style={{ ...style }}>{text}</div>
const BeershevaLoc = ({ text }) => <div
    style={
        { color: 'white', background: 'blue', padding: '10px 10px', borderRadius: '50%', textAlign: 'center', display: 'inline-flex' }
    }>{text}</div>
const PetachTikvaLoc = ({ text }) => <div
    style={
        { color: 'white', background: 'blue', padding: '10px 10px', borderRadius: '50%', textAlign: 'center', display: 'inline-flex' }
    }>{text}</div>


export default function GoogleMap({ coords, handleClick }) {
    console.log(coords);
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '70vh', width: '98%' }}>
            <GoogleMapReact
                onClick={handleClick}
                bootstrapURLKeys={{ key: "AIzaSyBJt0y52EfTaGx2Km5u6-0eSxrn9OfnbPI" }}
                center={coords.center}
                zoom={coords.zoom}
            >
                <Ashdod
                    lat={31.787864376924034}
                    lng={34.637242592595705}
                    text="Mr Toy Ashdod"
                />

                <BeershevaLoc
                    lat={31.2535509431709}
                    lng={34.79583312530979}
                    text="Mr Toy Beer Sheva"
                />

                <PetachTikvaLoc
                    lat={32.09489605074698}
                    lng={34.8648288345935}
                    text="Mr Toy Petach Tikva"
                />

            </GoogleMapReact>
        </div>
    );
}
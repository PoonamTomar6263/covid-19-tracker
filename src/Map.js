import React from 'react'
import "./Map.css";
import {MapContainer, TileLayer} from "react-leaflet";
function Map({center,zoom}) {
    return (
        <div className="map" >
            <h2>I am map another map</h2>
            <MapContainer center={center} zoom={zoom} >
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy;<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
        </div>
    )
}

export default Map

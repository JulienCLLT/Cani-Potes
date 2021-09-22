import React, {useState} from "react";
import {MapContainer, TileLayer, Marker, Popup, Circle} from "react-leaflet";
import L from 'leaflet';
import mapPin from "../../../assets/img/maps-and-flags.svg";
import "./map.css";
// requete axios, à chaque coordonnée (point balade), map sur Marker pour qu'ils s'affichent tous
// ne pas oublier la "key" quand map


const Map = () => {
    // const [lat, setLat] = useState(0);
    // const [lng, setLng] = useState(0);
    const lat = 43.5606;
    const lng = 4.085;

    const lat1 = 43.6167;
    const lng2 = 4.0167;
    // const getISS = async () => {
    //     const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    //     const data = await response.json();
    //     setLat(data.latitude);
    //     setLng(data.longitude);
    // };
    // setLat(51.766965502);
    // setLng(66.38113382904);

    const positionIcon = new L.Icon({
        iconUrl: mapPin,
        inconRetInaUrl: mapPin,
        popupAnchor: [-0,-0],
        iconSize: [12, 25], // iconSize: [32, 45],
    })

    const fillBlueOptions = {fillColor: 'blue'};
    return (
        <MapContainer style = {{height: "100vh", width:"100%"}} center={[lat, lng]} zoom={15} scrollWheelZoom={false}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <Circle center={[lat, lng]} pathOptions={fillBlueOptions} radius={1000} />

            <Marker position ={[lat, lng]} icon={positionIcon}>
                <Popup>
                    Wouhou ça clique
                </Popup>
            </Marker>
            <Marker position ={[lat1, lng2]} icon={positionIcon} />
        </MapContainer>
    )
};

export default Map;
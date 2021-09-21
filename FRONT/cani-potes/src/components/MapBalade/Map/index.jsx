import React, {useState} from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import L from 'leaflet';
import pawIcon from "../../../assets/img/paw-black.svg";
import "./map.css";


const Map = () => {
    // var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    // const [lat, setLat] = useState(0);
    // const [lng, setLng] = useState(0);
    const lat = 43.610769;
    const lng = 3.876716;
    // const getISS = async () => {
    //     const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    //     const data = await response.json();
    //     setLat(data.latitude);
    //     setLng(data.longitude);
    // };
    // setLat(51.766965502);
    // setLng(66.38113382904);

    const positionIcon = new L.Icon({
        iconUrl: pawIcon,
        inconRetInaUrl: pawIcon,
        popupAnchor: [-0,-0],
        iconSize: [32, 45],
    })
    return (
        <MapContainer style = {{height: "401px", width:"501px"}} center={[lat, lng]} zoom={17} scrollWheelZoom={false}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'>

            </TileLayer>

            <Marker position ={[lat, lng]} icon={positionIcon}>
                <Popup>
                    Ma zolie map
                </Popup>
            </Marker>
        </MapContainer>
    )

};

export default Map;
import React from "react";
import {Popup} from "react-leaflet";
import Profile from "../Profile/index";

//import images
import calendar from "../../../../assets/img/info-ride/calendar.svg";
import clock from '../../../../assets/img/info-ride/hourglass.svg';
import starting from '../../../../assets/img/info-ride/map-pin.svg';
// import km from '../../../../assets/img/info-ride/dog-walking.svg';
import end from '../../../../assets/img/info-ride/flag.svg';

//import css
import "./ride.scss";

const Ride = () => {
    return (
        <div className="ride-informations__all__details">
            <p><img className="icon" src={calendar} alt="calendar" />Vendredi 24 Septembre à 19h00</p>
            <p><img className="icon" src={clock} alt="clock" />10 minutes - 1km</p>
            <p><img className="icon" src={starting} alt="starting" />Départ : 1, rue de Paris, 34000 Montpellier</p>
            <p><img className="icon" src={end} alt="arrival" />Arrivée : 2, rue de Paris, 34000 Montpellier</p>
        </div>
    )
};

export default Ride;
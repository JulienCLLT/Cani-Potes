/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

// import leaflet
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import './createRide.scss';

import startPointFlag from '../../assets/img/info-ride/startPointFlag.svg';
import endPointFlag from '../../assets/img/info-ride/endPointFlag.svg';

const CreateRide = () => {
  const { user } = useSelector((state) => state);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // dispatch action to post data to bdd through middleware and if ride is created, add it to state
    console.log('submitted data : ', data);
  };

  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  ];
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const date = new Date();

  const positionStart = new L.Icon({
    iconUrl: startPointFlag,
    inconRetInaUrl: startPointFlag,
    popupAnchor: [-0, -0],
    iconSize: [45, 55], // iconSize: [32, 45],
  });

  const positionEnd = new L.Icon({
    iconUrl: endPointFlag,
    inconRetInaUrl: endPointFlag,
    popupAnchor: [-0, -0],
    iconSize: [45, 55], // iconSize: [32, 45],
  });

  const [switchPoint, setSwitchPoint] = useState('start');
  const [startPoint, setStartPoint] = useState(user.position);
  const [endPoint, setEndPoint] = useState();
  //* on veut bien voir deux Marker avec une icone différente entre celle de départ et celle d'arrivée

  const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click(e) {
        if (switchPoint === 'start') {
          setStartPoint([e.latlng.lat, e.latlng.lng]);
        }
        else if (switchPoint === 'end') {
          setEndPoint([e.latlng.lat, e.latlng.lng]);
        }
      },
    });
    return position === null ? null : (
      <Marker />
    );
  };

  return (
    <main className="create-ride">
      <h2>Création d'une balade</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="create-ride__field">
          <label htmlFor="title">Nom de ma balade</label>
          <input
            id="title"
            name="title"
            defaultValue="Ma super balade"
            {...register('title', { required: 'Title is needed' })}
          />
          {errors.title && <span>Le titre est obligatoire</span>}
        </div>

        <div className="create-ride__field">
          {/* <label htmlFor="startingPoint">Point de départ</label>
          <input
            id="startingPoint"
            name="startingPoint"
            defaultValue="Point de départ"
            {...register('startingPoint', { required: 'startingPoint is needed' })}
          />
          {errors.startingPoint && <span>Le point de départ est obligatoire</span>} */}
          <div className="create-ride__field__points">
            <div onClick={() => setSwitchPoint('start')}>Départ</div>
            <div onClick={() => setSwitchPoint('end')}>Arrivée</div>
          </div>
          <MapContainer className="leaflet-container" center={user.position} zoom={16} scrollWheelZoom>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={startPoint}
              icon={positionStart}
            />
            {endPoint && (
              <Marker
                position={endPoint}
                icon={positionEnd}
              />
            )}
            <LocationMarker />
          </MapContainer>
        </div>

        <div className="create-ride__field">
          <label htmlFor="endingPoint">Point d'arrivée</label>
          <input
            id="endingPoint"
            name="endingPoint"
            defaultValue="Point d'arrivée"
            {...register('endingPoint', { required: 'endingPoint is needed' })}
          />
          {errors.endingPoint && <span>Le point d'arrivée est obligatoire</span>}
        </div>

        <div className="create-ride__field">
          <label htmlFor="date">Jour de la balade</label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={`${date.getUTCFullYear().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${(date.getUTCDate() + 1).toString().padStart(2, '0')}`}
            min={`${date.getUTCFullYear().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`}
            {...register('date', { required: 'A day is needed' })}
          />
          {errors.date && <span>Le choix d'une date est obligatoire</span>}
        </div>

        <div className="create-ride__field">
          <p>Heure de départ</p>
          <label htmlFor="startHour" />
          <select {...register('startHour')} defaultValue={17}>
            {
							hours.map((hour) => <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}h</option>)
						}
          </select>
          <label htmlFor="startMin" />
          <select {...register('startMin')} defaultValue={30}>
            {
							minutes.map((minute) => <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>)
						}
          </select>

          {errors.startHour || errors.startMin && <span>L'heure de départ est obligatoire</span>}
        </div>

        <div className="create-ride__field">
          <p>Heure d'arrivée estimée</p>
          <p>18h55</p>
        </div>

        <div className="create-ride__field">
          <p>Temps de la balade</p>
          <p>27min</p>
        </div>

        <div className="create-ride__field">
          <label htmlFor="maxDogs">Nombre maximum de chiens</label>
          <input
            id="maxDogs"
            name="maxDogs"
            min={2}
            defaultValue={4}
            type="number"
            {...register('maxDogs', { required: 'maxDogs is needed' })}
          />
          {errors.maxDogs && <span>Le nombre max de chiens est obligatoire</span>}
        </div>

        <div className="create-ride__field">
          <label htmlFor="description">Description de ma balade</label>
          <textarea
            placeholder="Je souhaite me faire des Cani Potes :)"
            {...register('description', { required: 'Description is needed' })}
          />
          {errors.description && <span>La description est obligatoire</span>}
        </div>

        <input type="submit" />
      </form>
    </main>
  );
};

export default CreateRide;

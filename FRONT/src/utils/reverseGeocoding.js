/* eslint-disable linebreak-style */
import { geocodeService } from 'esri-leaflet-geocoder';
import { apikey } from './arcGiskey';

const geocodeServiceEsri = geocodeService({
  apikey,
});

// eslint-disable-next-line import/prefer-default-export
export const reverseGeocoding = (latlng, setStateValue) => {
  geocodeServiceEsri
    .reverse()
    .latlng(latlng)
    .run(async (error, result) => {
      // if (error) {
        // console.warn('reverse geocoding error', error);
      // }
      setStateValue(result.address.LongLabel);
    });
};

/* eslint-disable linebreak-style */
import { geocodeService } from 'esri-leaflet-geocoder';
import { apikey } from './arcGiskey';

const geocodeServiceEsri = geocodeService({
  apikey,
});

// reverse geocoding : convert lat and lng to address
// eslint-disable-next-line import/prefer-default-export
export const geocodingReverse = (latlng, useStatepointAddress) => {
  geocodeServiceEsri.reverse().latlng(latlng)
    .run((error, result) => {
      useStatepointAddress(result.address.LongLabel);
    });
};
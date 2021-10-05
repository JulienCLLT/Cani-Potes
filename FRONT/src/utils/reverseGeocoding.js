/* eslint-disable linebreak-style */
import { geocodeService } from 'esri-leaflet-geocoder';

const apikey = 'AAPKbde72a12e3ff4574b3edd95295b1d13d5-bGBIhj88MhjknVOZZpLcC1yEkpv4yu2Bx8MRWji_av4Hj2aqwc1AsUJ2UyTK3Q';

const geocodeServiceEsri = geocodeService({
  apikey,
});

// eslint-disable-next-line import/prefer-default-export
export const reverseGeocoding = (latlng, setStateValue) => {
  geocodeServiceEsri
    .reverse()
    .latlng(latlng)
    .run(async (error, result) => {
      if (error) {
        console.warn('reverse geocoding error', error);
      }
      setStateValue(result.address.LongLabel);
    });
};

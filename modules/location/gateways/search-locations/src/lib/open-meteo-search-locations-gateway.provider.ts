import { HttpClient } from '@angular/common/http';
import { Provider } from '@angular/core';
import { SEARCH_LOCATIONS_GATEWAY } from '@farmapp/location/core';
import { openMeteoSearchLocationsGatewayFactory } from './open-meteo-search-locations-gateway.factory';

const OPEN_METEO_GEOCODING_URL_TOKEN = 'OPEN_METEO_GEOCODING_URL_TOKEN';

export function provideOpenMeteoSearchLocationsGateway(): Provider[] {
  return [
    {
      provide: OPEN_METEO_GEOCODING_URL_TOKEN,
      useValue: 'https://geocoding-api.open-meteo.com/v1/search',
    },
    {
      provide: SEARCH_LOCATIONS_GATEWAY,
      useFactory: openMeteoSearchLocationsGatewayFactory,
      deps: [HttpClient, OPEN_METEO_GEOCODING_URL_TOKEN],
    },
  ];
}

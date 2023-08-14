import { InjectionToken, Provider } from '@angular/core';
import { SearchLocationsGateway } from '../../core/gateways';
import { openMeteoSearchLocationsGatewayFactory } from '../../gateways';
import { HttpClient } from '@angular/common/http';

const OPEN_METEO_GEOCODING_URL = new InjectionToken<string>('Open Meteo Geocoding URL');
export const SEARCH_LOCATIONS_GATEWAY = new InjectionToken<SearchLocationsGateway>('Search Locations GW');

export function provideSearchLocationsGateway(): Provider[] {
  return [
    {
      provide: OPEN_METEO_GEOCODING_URL,
      useValue: 'https://geocoding-api.open-meteo.com/v1/search',
    },
    {
      provide: SEARCH_LOCATIONS_GATEWAY,
      useFactory: openMeteoSearchLocationsGatewayFactory,
      deps: [HttpClient, OPEN_METEO_GEOCODING_URL],
    },
  ];
}

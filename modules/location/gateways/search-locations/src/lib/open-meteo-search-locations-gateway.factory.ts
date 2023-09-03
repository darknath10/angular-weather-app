import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { SearchLocationsGateway } from '@farmapp/location/core';

type OpenMeteoGeocodingApiResponse = {
  results: Array<{
    country: string;
    latitude: number;
    longitude: number;
    name: string;
    timezone: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
};

export function openMeteoSearchLocationsGatewayFactory(http: HttpClient, url: string): SearchLocationsGateway {
  return (query: string) => {
    const params = new HttpParams().append('name', query);
    return http.get<OpenMeteoGeocodingApiResponse>(url, { params }).pipe(
      map(({ results }) => results ?? []), // this is because open meteo api doesn't return empty fields (https://open-meteo.com/en/docs/geocoding-api)
      map((omLocations) => omLocations.map(
        ({ country, latitude, longitude, name, timezone }) => ({ country, latitude, longitude, name, timezone }),
      )),
      catchError((error) => throwError(() => new Error(`Could not fetch locations: ${error['reason'] ?? error['message'] ?? JSON.stringify(error)}`))),
    );
  };
}

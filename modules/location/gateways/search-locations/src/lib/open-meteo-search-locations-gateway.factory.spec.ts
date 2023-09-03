/* eslint-disable @typescript-eslint/no-explicit-any */
import { cold } from 'jasmine-marbles';
import { SearchLocationsGateway } from '@farmapp/location/core';
import { openMeteoSearchLocationsGatewayFactory } from './open-meteo-search-locations-gateway.factory';

describe('Open Meteo Search Locations Gateway', () => {
  let openMeteoSearchLocationsGw: SearchLocationsGateway;
  let httpClient: any;
  const url = 'openMeteoGeocodingUrl';

  describe('When the API call succeeds', () => {
    const API_CALL_RESULTS = {
      results: [
        {
          id: 2193733,
          name: 'Auckland',
          latitude: -36.84853,
          longitude: 174.76349,
          elevation: 43.0,
          feature_code: 'PPLA',
          country_code: 'NZ',
          admin1_id: 2193734,
          admin2_id: 2193732,
          timezone: 'Pacific/Auckland',
          population: 417910,
          country_id: 2186224,
          country: 'New Zealand',
          admin1: 'Auckland',
          admin2: 'Auckland',
        },
        {
          id: 5550202,
          name: 'Auckland',
          latitude: 36.588,
          longitude: -119.10678,
          elevation: 390.0,
          feature_code: 'PPL',
          country_code: 'US',
          admin1_id: 5332921,
          admin2_id: 5403789,
          timezone: 'America/Los_Angeles',
          country_id: 6252001,
          country: 'United States',
          admin1: 'California',
          admin2: 'Tulare',
        },
        {
          id: 7778818,
          name: 'Auckland Park',
          latitude: -26.18135,
          longitude: 28.00385,
          elevation: 1702.0,
          feature_code: 'PPL',
          country_code: 'ZA',
          admin1_id: 1085594,
          admin2_id: 8347354,
          admin3_id: 8347476,
          timezone: 'Africa/Johannesburg',
          country_id: 953987,
          country: 'South Africa',
          admin1: 'Gauteng',
          admin2: 'City of Johannesburg Metropolitan Municipality',
          admin3: 'City of Johannesburg',
        },
      ],
      generationtime_ms: 0.21994114,
    };
    
    beforeEach(() => {
      httpClient = { get: () => cold('-a|', { a: API_CALL_RESULTS }) };
      openMeteoSearchLocationsGw = openMeteoSearchLocationsGatewayFactory(httpClient, url)
    });

    it('should return a list of locations', () => {
      const LOCATIONS = [
        {
          name: 'Auckland',
          latitude: -36.84853,
          longitude: 174.76349,
          timezone: 'Pacific/Auckland',
          country: 'New Zealand',
        },
        {
          name: 'Auckland',
          latitude: 36.588,
          longitude: -119.10678,
          timezone: 'America/Los_Angeles',
          country: 'United States',
        },
        {
          name: 'Auckland Park',
          latitude: -26.18135,
          longitude: 28.00385,
          timezone: 'Africa/Johannesburg',
          country: 'South Africa',
        },
      ];
      const result = openMeteoSearchLocationsGw('');
      const expected = cold('-a|', { a: LOCATIONS });
      expect(result).toBeObservable(expected);
    });
  });

  describe('When the API call fails', () => {
    const API_CALL_ERROR = { reason: 'something went wrong' };

    beforeEach(() => {
      httpClient = { get: () => cold('-#', undefined, API_CALL_ERROR ) };
      openMeteoSearchLocationsGw = openMeteoSearchLocationsGatewayFactory(httpClient, url);
    });

    it('should throw an error with an appropriate message', () => {
      const ERROR = new Error(`Could not fetch locations: ${API_CALL_ERROR.reason}`);
      const result = openMeteoSearchLocationsGw('');
      const expected = cold('-#', undefined, ERROR);
      expect(result).toBeObservable(expected);
    });
  });

  describe('When an other error occurs (like network issue)', () => {
    const ERROR = new Error('An other error occured');

    beforeEach(() => {
      httpClient = { get: () => cold('-#', undefined, ERROR )};
      openMeteoSearchLocationsGw = openMeteoSearchLocationsGatewayFactory(httpClient, url);
    });

    it('should rethrow the error', () => {
      const result = openMeteoSearchLocationsGw('');
      const expected = cold('-#', undefined, new Error(`Could not fetch locations: ${ERROR.message}`));
      expect(result).toBeObservable(expected);
    });
  });
});

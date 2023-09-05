import { provideOpenMeteoCurrentWeatherGateway } from '@farmapp/weather/gateways';

export function provideCurrentWeatherGateway() {
  return provideOpenMeteoCurrentWeatherGateway();
}

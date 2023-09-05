import { provideOpenMeteoWeatherForecastGateway } from '@farmapp/weather/gateways';

export function provideWeatherForecastGateway() {
  return provideOpenMeteoWeatherForecastGateway();
}

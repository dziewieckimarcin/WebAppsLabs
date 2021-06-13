import { ForecastApiResponse } from "./forecastApiResponse";
import { Coord, WeatherApiResponse } from "./weatherApiResponse";

class WeatherApi{

    private readonly apiKeyValue = '3c9297d4bffa510f74b3d44806e88662';
    private readonly weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric&lang=pl';
    private readonly forecastUrl = 'http://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}&units=metric&lang=pl';
    private readonly cityKey = '{city name}';
    private readonly apiKey = '{API key}';
    private readonly latKey = '{lat}';
    private readonly lonKey = '{lon}';

    async getWeatherByCity(city: string): Promise<WeatherApiResponse>{
        let validUrl = this.weatherUrl.replace(this.cityKey, city).replace(this.apiKey, this.apiKeyValue);

        let response = await fetch(validUrl);

        if (response.ok){
            let jsonResponse = (await response.json()) as WeatherApiResponse;
            return jsonResponse;
        }
        else{
            console.log("fetch data error");
            return null;
        }
        
    }

    async getForecastByCity(city: string, cords: Coord): Promise<ForecastApiResponse>{
        let validUrl = this.forecastUrl.replace(this.apiKey, this.apiKeyValue).replace(this.latKey, cords.lat.toString()).replace(this.lonKey, cords.lon.toString());

        let response = await fetch(validUrl);

        if (response.ok){
            let jsonResponse = (await response.json()) as ForecastApiResponse;
            return jsonResponse;
        }
        else{
            console.log("fetch data error");
            return null;
        }   
    }
}

export {WeatherApi}